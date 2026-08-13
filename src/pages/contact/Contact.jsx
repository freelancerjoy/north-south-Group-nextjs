import { useState, useEffect } from "react";
import AOS from "aos";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
import { toast } from "react-toastify";
import { useContactStore } from "../../store/contact/contactStore";
import { useContactInfoStore } from "../../store/contactInfo/contactInfoStore";

export default function Contact() {
  const { addContact, isLoading } = useContactStore();
  const { contactInfo, loadContactInfo } = useContactInfoStore();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, number, address, email, message };
    try {
      await addContact(payload);
      toast.success("Message sent successfully!");
      setName(""); setNumber(""); setAddress(""); setEmail(""); setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    loadContactInfo();
  }, []);

  const info = contactInfo || {};
  const infoCards = [
    {
      icon: <FaMapMarkerAlt size={22} />,
      title: info.corporateOfficeTitle || "Corporate Office",
      lines: info.corporateOfficeLines || [],
    },
    {
      icon: <FaMapMarkerAlt size={22} />,
      title: info.dubaiOfficeTitle || "Dubai Office",
      lines: info.dubaiOfficeLines || [],
    },
    {
      icon: <FaPhoneAlt size={22} />,
      title: "Phone",
      lines: info.phones || [],
      href: "tel",
    },
    {
      icon: <FaEnvelope size={22} />,
      title: "Email",
      lines: info.emails || [],
      href: "mailto",
    },
    {
      icon: <FaGlobe size={22} />,
      title: "Website",
      lines: info.websites || [],
      href: "https",
    },
  ];

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm rounded-lg px-4 py-3.5 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all duration-300";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(180deg, #040811 0%, #0a0f1e 100%)" }}
    >
      {/* ambient glow blobs */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "#0f7771" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "#0a2a66" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div data-aos="fade-up" className="text-center mb-16">
          <p
            className="uppercase tracking-widest text-xs font-bold mb-3"
            style={{ color: "#0f7771" }}
          >
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let&apos;s Start a{" "}
            <span style={{ color: "#0f7771" }}>Conversation</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            We&apos;re open for any suggestion or just to have a chat. Reach out and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT: Form */}
          <div
            data-aos="fade-right"
            className="rounded-2xl border border-white/10 p-8 backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <h3 className="text-white text-xl font-semibold mb-6">Schedule a Meeting</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-xs uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-xs uppercase tracking-wider">Phone</label>
                  <input
                    type="text"
                    placeholder="+880 ..."
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs uppercase tracking-wider">Address</label>
                <input
                  type="text"
                  placeholder="Your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-xs uppercase tracking-wider">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={inputClass + " resize-none"}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full py-3.5 rounded-lg font-semibold text-white text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-90 hover:scale-[1.01] active:scale-100 disabled:opacity-60 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #0f7771 0%, #0a2a66 100%)",
                }}
              >
                {isLoading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>

          {/* RIGHT: Info Cards */}
          <div data-aos="fade-left" className="flex flex-col gap-4">
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="flex items-start gap-4 rounded-xl border border-white/10 p-5 transition-all duration-300 hover:border-teal-600/40 group"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Icon bubble */}
                <div
                  className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, #0f7771, #0a2a66)" }}
                >
                  {card.icon}
                </div>

                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1.5"
                    style={{ color: "#0f7771" }}
                  >
                    {card.title}
                  </p>
                  {card.lines.map((line, i) => {
                    if (card.href === "tel") {
                      return (
                        <a key={i} href={`tel:${line.replace(/\s/g, "")}`}
                          className="block text-sm text-gray-400 hover:text-white transition-colors">
                          {line}
                        </a>
                      );
                    }
                    if (card.href === "mailto") {
                      return (
                        <a key={i} href={`mailto:${line}`}
                          className="block text-sm text-gray-400 hover:text-white transition-colors">
                          {line}
                        </a>
                      );
                    }
                    if (card.href === "https") {
                      return (
                        <a key={i} href={`https://${line}`} target="_blank" rel="noopener noreferrer"
                          className="block text-sm text-gray-400 hover:text-white transition-colors">
                          {line}
                        </a>
                      );
                    }
                    return (
                      <p key={i} className="text-sm text-gray-400 leading-relaxed">{line}</p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
