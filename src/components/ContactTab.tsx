import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Navigation } from 'lucide-react';

export const ContactTab: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'Energy Trade Facilitation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: 'Energy Trade Facilitation',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="space-y-16 pb-16 bg-white">
      {/* PAGE HEADER */}
      <section className="bg-white py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-white bg-black px-3.5 py-1.5 rounded-full inline-block">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">
            Contact Our Executive Desk
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Whether you are seeking physical oil supply facilitation, market research, infrastructure advisory, or executive training, our Accra team is ready to respond.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-neutral-50 rounded-3xl p-8 border border-neutral-200 space-y-6 shadow-md">
            <div>
              <h2 className="text-2xl font-bold text-black">Send Us a Direct Message</h2>
              <p className="text-xs text-neutral-500 mt-1">
                Fill out the inquiry details below. Our trade desk responds within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-black">Message Delivered</h3>
                <p className="text-xs text-neutral-700 max-w-md mx-auto">
                  Thank you for reaching out to The Developers Energy Limited. An officer from our Accra desk will contact you via email/phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-bold text-white bg-black hover:bg-neutral-800"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kwame Mensah"
                      className="w-full bg-white border border-neutral-300 text-black text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="kwame@company.com"
                      className="w-full bg-white border border-neutral-300 text-black text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Energy Ghana"
                      className="w-full bg-white border border-neutral-300 text-black text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+233 24 000 0000"
                      className="w-full bg-white border border-neutral-300 text-black text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700">Inquiry Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-neutral-300 text-black text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-black"
                  >
                    <option value="Energy Trade Facilitation">Energy Trade Facilitation & Cargo</option>
                    <option value="Market Intelligence">Market Intelligence & Advisory Brief</option>
                    <option value="Infrastructure Consultancy">Infrastructure & Engineering Consultancy</option>
                    <option value="Training & Masterclass">Training & Capacity Development</option>
                    <option value="Strategic Partnership">Strategic Partnership & Investment</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700">Message / Deal Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about product volumes, timelines, or advisory needs..."
                    className="w-full bg-white border border-neutral-300 text-black text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200 space-y-6 shadow-md">
              <h3 className="text-lg font-bold text-black border-b border-neutral-200 pb-3">
                Head Office & Contact Details
              </h3>

              <div className="space-y-4 text-xs text-neutral-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-black block">Accra Office</strong>
                    <span>Accra, Ghana &bull; West Africa</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-black block">Telephone</strong>
                    <span className="text-black font-extrabold">+233 246470010</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-black block">Email Desk</strong>
                    <span className="text-black font-extrabold">info@developersenergy.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-black block">Trading Desk Hours</strong>
                    <span>Monday &ndash; Friday: 08:00 &ndash; 18:00 (GMT)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map Card */}
            <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200 space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-black flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-black" />
                  Accra Energy Hub Corridor
                </span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-100 px-2 py-0.5 rounded-full">LIVE HUB</span>
              </div>

              <div className="h-48 rounded-2xl bg-neutral-900 border border-neutral-800 relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
                {/* Simulated Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40" />

                {/* Glowing Location Pin */}
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mx-auto animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-white text-xs">Accra HQ & Tema Terminal Axis</div>
                  <p className="text-[11px] text-neutral-400 max-w-xs">
                    Strategic positioning for Tema Port Tank Farms & Takoradi Energy Basin Access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
