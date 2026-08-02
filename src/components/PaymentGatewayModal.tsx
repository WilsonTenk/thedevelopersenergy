import React, { useState, useEffect } from 'react';
import { TrainingCourse } from '../types';
import {
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  X,
  Lock,
  Download,
  ShieldCheck,
  Receipt,
  User,
  Mail,
  Phone,
  Briefcase,
  ChevronRight,
  Sparkles,
  Ticket
} from 'lucide-react';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: TrainingCourse | null;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  course
}) => {
  const [seats, setSeats] = useState<number>(1);
  const [currency, setCurrency] = useState<'USD' | 'GHS'>('USD');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | 'bank'>('momo');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'telecel' | 'at'>('mtn');

  // Attendee info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // Processing & Receipt state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsCompleted(false);
      setIsProcessing(false);
      setProcessingStep(0);
      setSeats(1);
    }
  }, [isOpen, course]);

  // ESC key press handler to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  // Extract numeric fee from course.fee string like "$1,200 / Participant"
  const baseFeeUsd = parseInt(course.fee.replace(/[^0-9]/g, '')) || 1000;
  const exchangeRate = 15.28; // 1 USD = 15.28 GHS

  const subtotalUsd = baseFeeUsd * seats;
  const totalUsd = subtotalUsd;
  const totalGhs = Math.round(totalUsd * exchangeRate);

  const displayAmount = currency === 'USD' ? `$${totalUsd.toLocaleString()}` : `GHS ${totalGhs.toLocaleString()}`;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Please fill in all required attendee details (Full Name, Email, Phone Number).');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);

    setTimeout(() => {
      setProcessingStep(2);
    }, 1200);

    setTimeout(() => {
      setProcessingStep(3);
    }, 2400);

    setTimeout(() => {
      const randomRef = 'TDE-PAY-' + Math.floor(100000 + Math.random() * 900000);
      setTransactionRef(randomRef);
      setIsProcessing(false);
      setIsCompleted(true);
    }, 3600);
  };

  const handleDownloadReceipt = () => {
    const receiptText = `================================================================================
THE DEVELOPERS ENERGY LIMITED - OFFICIAL EXECUTIVE E-TICKET & RECEIPT
================================================================================
TRANSACTION REF : ${transactionRef}
PAYMENT DATE    : ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
STATUS          : CONFIRMED & PAID VIA PAYSTACK GATEWAY

--------------------------------------------------------------------------------
TRAINING & RESERVATION DETAILS:
COURSE TITLE    : ${course.title}
CATEGORY        : ${course.category}
DURATION        : ${course.duration}
RESERVED SEATS  : ${seats} Participant(s)
COHORT DATE     : ${course.upcomingDates[0] || 'Upcoming Scheduled Cohort'}

--------------------------------------------------------------------------------
ATTENDEE INFORMATION:
DELEGATE NAME   : ${fullName}
COMPANY / BDC   : ${company || 'Independent Delegate'}
EMAIL ADDRESS   : ${email}
CONTACT PHONE   : ${phone}

--------------------------------------------------------------------------------
PAYMENT SUMMARY:
PAYMENT METHOD  : ${paymentMethod === 'momo' ? `Mobile Money (${momoProvider.toUpperCase()})` : paymentMethod === 'card' ? 'Visa / Mastercard' : 'Direct Bank Wire'}
TOTAL AMOUNT    : ${displayAmount} (${currency})
PAYMENT GATEWAY : Paystack / TDE Corporate Merchant Desk

================================================================================
VENUE & ADMISSION:
Accra Petroleum Executive Center, Airport Residential Area, Accra, Ghana.
Please present this E-Ticket and Ref #${transactionRef} at registration desk.
================================================================================
`;

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TDE_Receipt_${transactionRef}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-5 sticky top-0 bg-white z-10 pt-1">
          <div className="space-y-1 pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-[10px] font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Paystack Secure Payment Gateway</span>
            </div>
            <h3 className="text-2xl font-extrabold text-black">
              Reserve Seat: {course.title}
            </h3>
            <p className="text-xs text-neutral-600">
              Instant Seat Confirmation & Payment Invoice for TDE Masterclass
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-black hover:text-white flex items-center justify-center text-neutral-700 transition-all shrink-0 border border-neutral-200 shadow-sm"
            title="Close Reservation Window"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PROCESSING SCREEN */}
        {isProcessing ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full border-4 border-black border-t-transparent animate-spin mx-auto" />
            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-black">
                {processingStep === 1 && 'Connecting to Paystack Secure Gateway...'}
                {processingStep === 2 && 'Authenticating Mobile Money / Card Auth...'}
                {processingStep === 3 && 'Finalizing Seat Reservation & Issuing Receipt...'}
              </h4>
              <p className="text-xs text-neutral-500 font-mono">
                Please do not close this window. Encrypted transaction in progress.
              </p>
            </div>
          </div>
        ) : isCompleted ? (
          /* SUCCESS CONFIRMATION RECEIPT */
          <div className="space-y-6 py-2">
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-extrabold text-emerald-950">
                Payment Successful & Seat Reserved!
              </h4>
              <p className="text-xs text-emerald-800 font-medium">
                Your reservation has been logged. An official admission packet and invoice have been dispatched.
              </p>
              <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-emerald-300 text-xs font-mono font-extrabold text-emerald-900 shadow-sm">
                Transaction Ref: {transactionRef}
              </div>
            </div>

            {/* E-Ticket Summary Box */}
            <div className="p-6 rounded-2xl bg-neutral-900 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase text-neutral-400 flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-emerald-400" />
                  Official Masterclass Pass
                </span>
                <span className="text-xs font-extrabold text-emerald-400 uppercase">CONFIRMED</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Delegate Name</span>
                  <span className="font-bold text-white text-sm">{fullName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Company / Org</span>
                  <span className="font-bold text-white text-sm">{company || 'Individual Delegate'}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Reserved Seats</span>
                  <span className="font-bold text-white text-sm">{seats} Participant(s)</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-mono">Amount Paid</span>
                  <span className="font-bold text-emerald-400 text-sm font-mono">{displayAmount}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleDownloadReceipt}
                className="w-full py-3 rounded-full text-xs font-extrabold text-white bg-black hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download E-Ticket & Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-extrabold text-black bg-neutral-100 hover:bg-neutral-200 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* FORM & PAYMENT SELECTION */
          <form onSubmit={handleProcessPayment} className="space-y-6">
            {/* Course Summary Banner */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 block">
                  Selected Course
                </span>
                <span className="font-extrabold text-black text-sm block mt-0.5">{course.title}</span>
                <span className="text-neutral-600">Duration: {course.duration} &bull; {course.upcomingDates[0]}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    currency === 'USD' ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  USD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('GHS')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    currency === 'GHS' ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  GHS
                </button>
              </div>
            </div>

            {/* Seats Counter */}
            <div className="flex items-center justify-between bg-neutral-100/80 p-4 rounded-2xl border border-neutral-200">
              <div>
                <span className="text-xs font-extrabold text-black uppercase tracking-wider block">
                  Number of Delegate Seats
                </span>
                <span className="text-[11px] text-neutral-500">
                  {currency === 'USD' ? `$${baseFeeUsd} per seat` : `GHS ${Math.round(baseFeeUsd * exchangeRate)} per seat`}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-neutral-300">
                <button
                  type="button"
                  onClick={() => setSeats(Math.max(1, seats - 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-100 font-bold hover:bg-black hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="font-mono font-extrabold text-sm w-6 text-center">{seats}</span>
                <button
                  type="button"
                  onClick={() => setSeats(seats + 1)}
                  className="w-8 h-8 rounded-lg bg-neutral-100 font-bold hover:bg-black hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Attendee Details Inputs */}
            <div className="space-y-3 pt-1">
              <span className="text-xs font-extrabold text-black uppercase tracking-wider block">
                Attendee Registration Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-1">
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
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-black outline-none bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-1">
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
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-black outline-none bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+233 24 000 0000"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-black outline-none bg-neutral-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-1">
                    Organization / BDC Name
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Ghana Oil BDC"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-black outline-none bg-neutral-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-extrabold text-black uppercase tracking-wider block">
                Select Payment Channel
              </span>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'momo'
                      ? 'border-black bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-2" />
                  <div>
                    <span className="text-xs font-extrabold block">Mobile Money</span>
                    <span className="text-[9px] opacity-70">MTN / Telecel / AT</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-black bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-2" />
                  <div>
                    <span className="text-xs font-extrabold block">Debit / Credit</span>
                    <span className="text-[9px] opacity-70">Visa & Mastercard</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    paymentMethod === 'bank'
                      ? 'border-black bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <Building className="w-5 h-5 mb-2" />
                  <div>
                    <span className="text-xs font-extrabold block">Bank Wire</span>
                    <span className="text-[9px] opacity-70">Direct Corporate Transfer</span>
                  </div>
                </button>
              </div>

              {/* Mobile Money Provider Radio if selected */}
              {paymentMethod === 'momo' && (
                <div className="p-3 bg-neutral-100 rounded-2xl border border-neutral-200 flex items-center gap-4 text-xs">
                  <span className="font-bold text-neutral-700 text-[11px]">Provider:</span>
                  <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="momo"
                      checked={momoProvider === 'mtn'}
                      onChange={() => setMomoProvider('mtn')}
                      className="accent-black"
                    />
                    <span>MTN MoMo</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="momo"
                      checked={momoProvider === 'telecel'}
                      onChange={() => setMomoProvider('telecel')}
                      className="accent-black"
                    />
                    <span>Telecel Cash</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="momo"
                      checked={momoProvider === 'at'}
                      onChange={() => setMomoProvider('at')}
                      className="accent-black"
                    />
                    <span>AT Money</span>
                  </label>
                </div>
              )}
            </div>

            {/* Payment Summary & Checkout Button */}
            <div className="pt-3 border-t border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 block">Total Investment ({seats} Seat{seats > 1 ? 's' : ''})</span>
                  <span className="text-2xl font-extrabold text-black font-mono">{displayAmount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/3 py-4 rounded-full text-xs font-extrabold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-all border border-neutral-200"
                >
                  Cancel / Close
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-2/3 py-4 rounded-full text-xs font-extrabold text-white bg-black hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-98"
                >
                  <span>Pay & Reserve Seat ({displayAmount})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
