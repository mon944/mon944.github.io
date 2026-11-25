import { useState, type FormEvent } from 'react';
import { Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-react';
import { PERSON_PROFILE } from '../data/portfolioData';
import {
  buildMailtoHref,
  validateContactForm,
  type ContactFormValues,
} from '../utils/portfolioLogic';
import { Reveal } from './Reveal';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [submittedHref, setSubmittedHref] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleFieldChange = (field: keyof ContactFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSON_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateContactForm(values);

    if (!result.valid) {
      setErrors(result.errors);
      setSubmittedHref(null);
      return;
    }

    const mailtoHref = buildMailtoHref(PERSON_PROFILE.email, values);
    setErrors({});
    setSubmittedHref(mailtoHref);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setSubmittedHref(null);
  };

  return (
    <section id="contact" className="py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left column: Direct Channels */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
                Contact
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                Open to FEA/CFD simulation collaborations, CAD design projects, research discussions, and entrepreneurial opportunities.
              </p>

              <div className="mt-8 divide-y divide-slate-200 dark:divide-slate-800/80 border-t border-b border-slate-200 dark:border-slate-800/80">
                {/* Email Row */}
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <Mail
                      className="h-5 w-5 shrink-0 text-teal-700 dark:text-teal-400"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-slate-500 dark:text-slate-400">Email</p>
                      <a
                        href={`mailto:${PERSON_PROFILE.email}`}
                        className="block truncate text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                      >
                        {PERSON_PROFILE.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#11151C] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-teal-600 dark:hover:border-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* LinkedIn Row */}
                <a
                  href={PERSON_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[56px] items-center justify-between gap-4 py-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <Linkedin
                      className="h-5 w-5 shrink-0 text-teal-700 dark:text-teal-400"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-slate-500 dark:text-slate-400">LinkedIn</p>
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {PERSON_PROFILE.linkedinDisplay}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-slate-400 group-hover:text-teal-700 dark:group-hover:text-teal-400">
                    Open
                  </span>
                </a>

                {/* GitHub Row */}
                <a
                  href={PERSON_PROFILE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[56px] items-center justify-between gap-4 py-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-sm"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <Github
                      className="h-5 w-5 shrink-0 text-teal-700 dark:text-teal-400"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-slate-500 dark:text-slate-400">GitHub</p>
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {PERSON_PROFILE.githubDisplay}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-slate-400 group-hover:text-teal-700 dark:group-hover:text-teal-400">
                    Open
                  </span>
                </a>
              </div>
            </div>

            {/* Right column: Simple Validated Mailto Form */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-[#10151E]/95 p-6 sm:p-8 shadow-xs dark:shadow-none">
                <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-slate-50">
                  Send a Message
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Composes a formatted email draft directly to {PERSON_PROFILE.email}.
                </p>

                {submittedHref ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-6 rounded-lg border border-teal-600/40 dark:border-teal-400/40 bg-teal-50/70 dark:bg-teal-950/30 p-5"
                  >
                    <p className="text-sm font-semibold text-teal-900 dark:text-teal-200">
                      Email draft prepared for {values.name.trim()}
                    </p>
                    <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-300">
                      Your message is formatted and ready to open in your default email client.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={submittedHref}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-teal-600 dark:bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-950 hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors whitespace-nowrap"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        <span>Open in Email Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#11151C] px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Write Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={values.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          placeholder="Your name"
                          className="mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#090B0E] px-3.5 py-2.5 text-sm text-slate-950 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-teal-600 dark:focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/25"
                        />
                        {errors.name && (
                          <p
                            id="contact-name-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={values.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          placeholder="you@example.com"
                          className="mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#090B0E] px-3.5 py-2.5 text-sm text-slate-950 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-teal-600 dark:focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/25"
                        />
                        {errors.email && (
                          <p
                            id="contact-email-error"
                            role="alert"
                            className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        Subject <span className="text-slate-400 dark:text-slate-500">(optional)</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={values.subject}
                        onChange={(e) => handleFieldChange('subject', e.target.value)}
                        placeholder="FEA/CFD collaboration, CAD project, or inquiry"
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#090B0E] px-3.5 py-2.5 text-sm text-slate-950 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-teal-600 dark:focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/25"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        required
                        value={values.message}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        placeholder="Share a brief overview of your project, timeline, or question..."
                        className="mt-1.5 block w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#090B0E] px-3.5 py-2.5 text-sm text-slate-950 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-teal-600 dark:focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/25 resize-y"
                      />
                      {errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-teal-600 dark:bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white dark:text-slate-950 hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0F131A]"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>Prepare Email</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
