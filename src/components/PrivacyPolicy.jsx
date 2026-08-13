import { FaCheckCircle, FaCookieBite, FaEnvelope, FaGlobe, FaLock, FaShieldAlt } from "react-icons/fa";
import privacy from "../assets/images/privacy.png";

const displayFont = { fontFamily: '"Montserrat", sans-serif' };
const bodyFont = { fontFamily: '"Montserrat", sans-serif' };
const accentFont = {
  fontFamily: '"Montserrat", sans-serif',
  letterSpacing: "0.16em",
  fontWeight: 700,
};

const highlights = [
  {
    icon: FaShieldAlt,
    title: "Privacy First",
    text: "We collect only the information needed to respond, support, and improve our services.",
  },
  {
    icon: FaLock,
    title: "Secure Handling",
    text: "Personal information is handled with practical safeguards and controlled internal access.",
  },
  {
    icon: FaCookieBite,
    title: "Transparent Tracking",
    text: "Cookies and basic analytics may be used to improve browsing experience and site performance.",
  },
];

const sections = [
  {
    number: "01",
    title: "Consent",
    body:
      "By using the North South Group website, you consent to this Privacy Policy and agree to its terms.",
  },
  {
    number: "02",
    title: "Information We Collect",
    body:
      "We collect information only when it is necessary for communication, service delivery, or improving the website experience.",
    bullets: [
      "Name",
      "Email address",
      "Phone number",
      "Company name",
      "Address",
      "Messages, inquiry details, or files you submit",
    ],
  },
  {
    number: "03",
    title: "How We Use Your Information",
    bullets: [
      "Operate and maintain our website",
      "Improve and personalize user experience",
      "Understand website usage and visitor needs",
      "Develop new services, features, and communication flows",
      "Respond to inquiries and support requests",
      "Send updates or service-related communication when appropriate",
      "Help detect misuse, fraud, or security risks",
    ],
  },
  {
    number: "04",
    title: "Log Files",
    body:
      "Like many websites, we may use standard log information such as IP address, browser type, internet service provider, timestamps, referring pages, and click behavior. This information is used for analytics, administration, and security, and is not linked to personally identifiable profiles.",
  },
  {
    number: "05",
    title: "Cookies and Web Beacons",
    body:
      "Our website may use cookies to remember visitor preferences and help us improve navigation, usability, and performance across devices.",
  },
  {
    number: "06",
    title: "Third-Party Privacy Policies",
    body:
      "This Privacy Policy does not apply to third-party websites, advertisers, or services linked from our platform. We encourage users to review the privacy policies of those external services separately.",
  },
  {
    number: "07",
    title: "CCPA Privacy Rights",
    body: "California residents may request to:",
    bullets: [
      "Know what personal data has been collected",
      "Request deletion of personal data",
      "Request that personal data not be sold",
    ],
  },
  {
    number: "08",
    title: "GDPR Data Protection Rights",
    body: "Where applicable, users may have the right to:",
    bullets: [
      "Access personal data",
      "Correct inaccurate data",
      "Request erasure",
      "Restrict processing",
      "Object to processing",
      "Request data portability",
    ],
  },
  {
    number: "09",
    title: "Children's Information",
    body:
      "We do not knowingly collect personal information from children under 13 years of age. If you believe a child has submitted such information, please contact us so we can remove it promptly.",
  },
  {
    number: "10",
    title: "Changes to This Policy",
    body:
      "We may update this Privacy Policy from time to time. Any revisions will be posted on this page with the latest effective date.",
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="overflow-hidden bg-white text-slate-900" style={bodyFont}>
      <section className="relative isolate min-h-[560px] overflow-hidden">
        <img src={privacy} alt="Privacy Policy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.84)_0%,rgba(2,6,23,0.68)_48%,rgba(2,6,23,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(34,197,94,0.22),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(234,179,8,0.18),transparent_22%)]" />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-end px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase text-green-200" style={accentFont}>
                Legal Information
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[4.25rem]" style={displayFont}>
                Privacy Policy for North South Group
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                This page explains how information may be collected, used, protected, and managed when you visit our
                website or communicate with our team.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <p className="text-xs font-bold uppercase text-green-100" style={accentFont}>
                Effective Date
              </p>
              <p className="mt-3 text-3xl font-semibold text-white" style={displayFont}>
                April 28, 2026
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-200">
                We recommend reviewing this policy periodically if you regularly submit inquiries, applications, or
                project-related information through our website.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(34,197,94,0.14),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(234,179,8,0.12),transparent_22%),linear-gradient(180deg,#ffffff_0%,#f5fbf5_46%,#ffffff_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase text-green-700" style={accentFont}>
              Privacy Overview
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl" style={displayFont}>
              Clear, readable, and transparent information handling
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
              We want this page to be practical, not confusing. The summary below highlights the most important ideas
              before the detailed sections.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-green-100 bg-white/88 p-6 shadow-[0_24px_70px_-48px_rgba(22,101,52,0.72)] ring-1 ring-green-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white shadow-[0_18px_40px_-22px_rgba(34,197,94,0.8)]">
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-slate-950" style={displayFont}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 grid gap-6">
            {sections.map((section) => (
              <section
                key={section.number}
                className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.35)] sm:p-8"
              >
                <div className="grid gap-6 lg:grid-cols-[120px_1fr]">
                  <div>
                    <div className="inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold uppercase text-green-700">
                      Section {section.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-950 sm:text-3xl" style={displayFont}>
                      {section.title}
                    </h3>
                    {section.body ? (
                      <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">{section.body}</p>
                    ) : null}
                    {section.bullets ? (
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {section.bullets.map((point) => (
                          <div
                            key={point}
                            className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-3"
                          >
                            <FaCheckCircle className="mt-1 shrink-0 text-green-600" />
                            <p className="text-sm leading-7 text-slate-700">{point}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#052e16_0%,#14532d_44%,#166534_100%)] p-8 text-white shadow-[0_32px_100px_-52px_rgba(22,101,52,0.9)] sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase text-green-100" style={accentFont}>
                  Contact Us
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl" style={displayFont}>
                  Questions about this policy?
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-green-50/90 sm:text-base">
                  If you need clarification about how your information is handled, feel free to contact North South
                  Group through the details below.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-green-100">Email</p>
                      <p className="mt-1 text-sm text-white/90 sm:text-base">info@northsouthgroup.com</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-5 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                      <FaGlobe />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-green-100">Website</p>
                      <p className="mt-1 text-sm text-white/90 sm:text-base">www.northsouthgroup.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
