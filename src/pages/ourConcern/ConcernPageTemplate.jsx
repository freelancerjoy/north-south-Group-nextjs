import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCompass,
  FiLayers,
  FiMapPin,
  FiPhone,
  FiSend,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";
import { useContactStore } from "../../store/contact/contactStore";
import { useContactInfoStore } from "../../store/contactInfo/contactInfoStore";

const displayFont = { fontFamily: '"Montserrat", sans-serif' };
const accentFont = {
  fontFamily: '"Montserrat", sans-serif',
  letterSpacing: "0.18em",
  fontWeight: 700,
};
const bodyFont = { fontFamily: '"Montserrat", sans-serif' };

const themes = {
  emerald: {
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-100",
    accentRing: "ring-emerald-100",
    solidBg: "bg-emerald-600",
    softBg: "bg-emerald-50",
    softPanel: "bg-emerald-50/70",
    darkGradient: "from-emerald-950 via-slate-950 to-teal-950",
    buttonGradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-900/20",
  },
  teal: {
    accentText: "text-teal-600",
    accentBg: "bg-teal-50",
    accentBorder: "border-teal-100",
    accentRing: "ring-teal-100",
    solidBg: "bg-teal-600",
    softBg: "bg-teal-50",
    softPanel: "bg-teal-50/70",
    darkGradient: "from-slate-950 via-teal-950 to-cyan-950",
    buttonGradient: "from-teal-500 to-cyan-500",
    glow: "shadow-teal-900/20",
  },
  blue: {
    accentText: "text-sky-600",
    accentBg: "bg-sky-50",
    accentBorder: "border-sky-100",
    accentRing: "ring-sky-100",
    solidBg: "bg-sky-600",
    softBg: "bg-sky-50",
    softPanel: "bg-sky-50/70",
    darkGradient: "from-slate-950 via-blue-950 to-cyan-950",
    buttonGradient: "from-sky-500 to-blue-600",
    glow: "shadow-sky-900/20",
  },
  amber: {
    accentText: "text-amber-600",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-100",
    accentRing: "ring-amber-100",
    solidBg: "bg-amber-500",
    softBg: "bg-amber-50",
    softPanel: "bg-amber-50/70",
    darkGradient: "from-stone-950 via-amber-950 to-emerald-950",
    buttonGradient: "from-amber-400 to-emerald-500",
    glow: "shadow-amber-900/20",
  },
};

const iconPool = [FiLayers, FiShield, FiCompass, FiTrendingUp, FiStar, FiCheckCircle];

const uniqueImages = (items) => [...new Set(items.filter(Boolean))];

function Eyebrow({ children, theme, center = false, light = false }) {
  return (
    <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span
        className={`inline-flex rounded-full border px-4 py-1.5 text-[0.68rem] font-bold uppercase ${
          light
            ? "border-white/20 bg-white/10 text-white/85"
            : `${theme.accentBg} ${theme.accentBorder} ${theme.accentText}`
        }`}
        style={accentFont}
      >
        {children}
      </span>
    </div>
  );
}

function HeroSlider({ slides, title, subtitle, eyebrow, theme, onExplore, onContact }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const total = slides.length;

  const next = () => setCurrent((value) => (value + 1) % total);
  const prev = () => setCurrent((value) => (value - 1 + total) % total);

  useEffect(() => {
    if (total < 2) return undefined;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const resetTimer = (callback) => {
    clearInterval(timerRef.current);
    callback();
    if (total > 1) timerRef.current = setInterval(next, 5000);
  };

  return (
    <section className="relative isolate min-h-[720px] overflow-hidden">
      {slides.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={src} alt={`${title} ${index + 1}`} className="h-full w-full object-cover" />
        </div>
      ))}

      <div className={`absolute inset-0 bg-gradient-to-br ${theme.darkGradient} opacity-80`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.08),transparent_18%)]" />

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-24">
        <div className="max-w-3xl">
          <Eyebrow theme={theme} light>{eyebrow}</Eyebrow>
          <h1
            className="mt-6 text-5xl font-semibold leading-[0.96] tracking-tight text-white md:text-7xl"
            style={displayFont}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 md:text-lg" style={bodyFont}>
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onExplore}
              className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${theme.buttonGradient} px-8 py-3.5 text-sm font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-1`}
              style={bodyFont}
            >
              Explore Overview <FiArrowUpRight />
            </button>
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/16"
              style={bodyFont}
            >
              Contact Team <FiSend />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => resetTimer(() => setCurrent(index))}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? `w-8 ${theme.solidBg}` : "w-2 bg-white/45"
            }`}
          />
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => resetTimer(prev)}
            className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => resetTimer(next)}
            className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition hover:bg-black/50"
          >
            <FiChevronRight size={22} />
          </button>
        </>
      )}
    </section>
  );
}

function Gallery({ images, theme }) {
  const [lightbox, setLightbox] = useState(null);

  if (!images?.length) return null;

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <Eyebrow theme={theme} center>Gallery</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold text-slate-950 md:text-5xl" style={displayFont}>
            Project Gallery
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base" style={bodyFont}>
            A curated visual collection that keeps the concern page rich, premium, and easy to update from the admin panel.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className={`group relative overflow-hidden rounded-[1.6rem] ${
                index % 5 === 0 ? "col-span-2 row-span-2 aspect-[1.4/1]" : "aspect-square"
              }`}
              onClick={() => setLightbox(index)}
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4" onClick={() => setLightbox(null)}>
          <button
            type="button"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <FiX size={20} />
          </button>
          <button
            type="button"
            className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((lightbox - 1 + images.length) % images.length);
            }}
          >
            <FiChevronLeft size={22} />
          </button>
          <img
            src={images[lightbox]}
            alt={`Gallery ${lightbox + 1}`}
            className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((lightbox + 1) % images.length);
            }}
          >
            <FiChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}

function ContactSection({ theme, title, description, buttonLabel, ctaTitle, ctaText }) {
  const { addContact, isLoading } = useContactStore();
  const { contactInfo, loadContactInfo } = useContactInfoStore();
  const [form, setForm] = useState({
    name: "",
    number: "",
    address: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    loadContactInfo();
  }, [loadContactInfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addContact(form);
      toast.success("Message sent successfully!");
      setForm({ name: "", number: "", address: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    }
  };

  const info = contactInfo || {};
  const infoCards = [
    {
      title: info.corporateOfficeTitle || "Corporate Office",
      lines: info.corporateOfficeLines || [],
      icon: <FiMapPin size={20} />,
    },
    {
      title: "Phone",
      lines: info.phones || [],
      icon: <FiPhone size={20} />,
    },
  ].filter((item) => item.lines.length > 0);

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white/25 focus:bg-white/10";

  return (
    <section id="concern-contact" className="px-6 py-24">
      <div className={`mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-gradient-to-br ${theme.darkGradient} shadow-2xl`}>
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-white/10 p-8 text-white lg:border-b-0 lg:border-r lg:p-12">
            <span
              className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[0.68rem] font-bold uppercase text-white/75"
              style={accentFont}
            >
              Contact Form
            </span>
            <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl" style={displayFont}>
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-8 text-white/70 md:text-base" style={bodyFont}>
              {description}
            </p>

            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-2xl font-semibold text-white" style={displayFont}>
                {ctaTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/65" style={bodyFont}>
                {ctaText}
              </p>

              <div className="mt-8 grid gap-4">
                {infoCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <div className="flex items-start gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${theme.accentBg} ${theme.accentText}`}>
                        {card.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80" style={accentFont}>
                          {card.title}
                        </p>
                        <div className="mt-2 space-y-1">
                          {card.lines.map((line) => (
                            <p key={line} className="text-sm text-white/68" style={bodyFont}>
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 text-white lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80" style={bodyFont}>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Your full name" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80" style={bodyFont}>Phone</label>
                  <input name="number" value={form.number} onChange={handleChange} className={inputClass} placeholder="+880..." required />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80" style={bodyFont}>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/80" style={bodyFont}>Address</label>
                  <input name="address" value={form.address} onChange={handleChange} className={inputClass} placeholder="Your address" required />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80" style={bodyFont}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r ${theme.buttonGradient} px-8 py-4 text-sm font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60`}
                style={bodyFont}
              >
                {isLoading ? "Sending..." : buttonLabel} <FiArrowUpRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConcernPageTemplate({
  theme = "emerald",
  eyebrow,
  title,
  subtitle,
  heroImage,
  heroSliderImages = [],
  aboutImage,
  aboutTitle,
  aboutParagraphs = [],
  stats = [],
  servicesTitle = "Our Services",
  servicesDescription,
  services = [],
  featuresTitle = "Key Features",
  featuresDescription,
  features = [],
  highlightsTitle = "Why Choose Us",
  highlightsDescription,
  highlights = [],
  galleryImages = [],
  ctaTitle,
  ctaText,
  contactTitle = "Send us your message",
  contactDescription,
  contactButtonLabel = "Send Message",
}) {
  const palette = themes[theme] || themes.emerald;
  const overviewRef = useRef(null);
  const contactRef = useRef(null);

  const slides = uniqueImages(heroSliderImages).slice(0, 3).length
    ? uniqueImages(heroSliderImages).slice(0, 3)
    : uniqueImages([heroImage]).filter(Boolean);

  const displayStats = stats.length
    ? stats
    : [
        { value: "Trust", label: "Built through responsible delivery" },
        { value: "Quality", label: "Maintained across every operation" },
        { value: "Growth", label: "Planned for long-term impact" },
      ];

  const scrollToOverview = () => overviewRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="overflow-hidden bg-[#f6f7f3] text-slate-900">
      {slides.length > 0 && (
        <HeroSlider
          slides={slides}
          title={title}
          subtitle={subtitle}
          eyebrow={eyebrow}
          theme={palette}
          onExplore={scrollToOverview}
          onContact={scrollToContact}
        />
      )}

      <section id="overview" ref={overviewRef} className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative">
            <div className={`absolute -left-5 -top-5 h-full w-full rounded-[2rem] ${palette.softBg}`} />
            <img
              src={aboutImage || heroImage || slides[0]}
              alt={aboutTitle}
              className={`relative h-[460px] w-full rounded-[2rem] object-cover shadow-2xl ${palette.glow}`}
            />
          </div>

          <div>
            <Eyebrow theme={palette}>Project Overview</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl" style={displayFont}>
              {aboutTitle}
            </h2>
            <div className="mt-6 space-y-4">
              {aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="text-sm leading-8 text-slate-600 md:text-base" style={bodyFont}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {displayStats.map((item, index) => (
                <div key={`${item.value}-${index}`} className={`rounded-3xl bg-white p-5 shadow-sm ring-1 ${palette.accentRing}`}>
                  <p className={`text-3xl font-semibold ${palette.accentText}`} style={displayFont}>
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase leading-5 tracking-[0.13em] text-slate-400" style={accentFont}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className={`bg-gradient-to-br ${palette.darkGradient} px-6 py-24 text-white`}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <Eyebrow theme={palette} light>Our Services</Eyebrow>
              <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl" style={displayFont}>
                {servicesTitle}
              </h2>
              {servicesDescription && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 md:text-base" style={bodyFont}>
                  {servicesDescription}
                </p>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => (
                <article key={`${service.title}-${index}`} className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.08] shadow-2xl backdrop-blur">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image || heroImage || slides[0]}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold leading-tight text-white" style={displayFont}>
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/65" style={bodyFont}>
                      {service.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {features.length > 0 && (
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <Eyebrow theme={palette} center>Feature</Eyebrow>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl" style={displayFont}>
                {featuresTitle}
              </h2>
              {featuresDescription && (
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base" style={bodyFont}>
                  {featuresDescription}
                </p>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {features.map((feature, index) => (
                <article key={`${feature.title}-${index}`} className="overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className={`grid h-full gap-0 ${index % 2 === 0 ? "" : ""}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={feature.image || galleryImages[index % galleryImages.length] || heroImage || slides[0]}
                        alt={feature.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                    </div>
                    <div className={`p-6 ${palette.softPanel}`}>
                      <h3 className="text-2xl font-semibold text-slate-950" style={displayFont}>
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600" style={bodyFont}>
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {highlights.length > 0 && (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <Eyebrow theme={palette} center>Why Choose Us</Eyebrow>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl" style={displayFont}>
                {highlightsTitle}
              </h2>
              {highlightsDescription && (
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base" style={bodyFont}>
                  {highlightsDescription}
                </p>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item, index) => {
                const Icon = iconPool[index % iconPool.length];
                return (
                  <div key={`${item.title}-${index}`} className="group rounded-[1.7rem] border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${palette.accentBg} ${palette.accentText} transition duration-300 group-hover:scale-110`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-950" style={displayFont}>
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500" style={bodyFont}>
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Gallery images={galleryImages} theme={palette} />

      <div ref={contactRef}>
        <ContactSection
          theme={palette}
          title={contactTitle}
          description={
            contactDescription ||
            "Share your contact details and tell us what you need. Our team will respond with the right next step."
          }
          buttonLabel={contactButtonLabel}
          ctaTitle={ctaTitle || `Partner with ${title}`}
          ctaText={
            ctaText ||
            "Connect with North South Group to discuss opportunities, partnership, service requirements, or the next move for this concern."
          }
        />
      </div>
    </main>
  );
}

export default ConcernPageTemplate;
