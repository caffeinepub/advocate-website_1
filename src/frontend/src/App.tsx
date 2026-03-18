import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Bell,
  Briefcase,
  Building,
  Building2,
  CheckCircle2,
  ChevronDown,
  FileText,
  Gavel,
  HeartHandshake,
  Home,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  Shield,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import AssociatesPage from "./AssociatesPage";
import { LegalMatterType } from "./backend.d";

/* ── Fade-in section wrapper ── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Stagger variants for grid reveals ── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

/* ── Animated counter ── */
function AnimatedCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number.parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const duration = 1600;
    const steps = 60;
    const increment = Math.ceil(target / steps);
    const interval = Math.floor(duration / steps);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center bg-secondary rounded-sm py-4 px-3">
      <div className="font-display text-2xl font-bold text-gold">
        {isInView ? count : 0}
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

/* ── Nav links ── */
const NAV_LINKS = [
  { href: "#home", label: "Home", shortLabel: "Home" },
  { href: "#about", label: "About", shortLabel: "About" },
  { href: "#practice", label: "Practice Areas", shortLabel: "Practice" },
  { href: "#courts", label: "Courts", shortLabel: "Courts" },
  { href: "#services", label: "Services", shortLabel: "Services" },
  { href: "#associates", label: "Associates", shortLabel: "Team" },
];

const NAV_OCIDS = [
  "nav.home.link",
  "nav.about.link",
  "nav.practice.link",
  "nav.courts.link",
  "nav.services.link",
  "nav.associates.link",
];

/* ── Practice areas ── */
const PRACTICE_AREAS = [
  {
    icon: Gavel,
    title: "Criminal Law",
    description:
      "Robust defense and prosecution services for criminal matters including bail, trials, and appeals before High Courts.",
  },
  {
    icon: Scale,
    title: "Civil Law",
    description:
      "Expert representation in civil disputes, injunctions, specific performance, and recovery suits with strategic litigation planning.",
  },
  {
    icon: HeartHandshake,
    title: "Family Law",
    description:
      "Sensitive handling of matrimonial disputes, divorce proceedings, child custody, maintenance, and succession matters.",
  },
  {
    icon: Building,
    title: "Corporate Law",
    description:
      "Comprehensive corporate legal services including company formation, contract drafting, regulatory compliance, and M&A advisory.",
  },
  {
    icon: Home,
    title: "Property Law",
    description:
      "Expert guidance on property acquisition, title verification, partition suits, and real estate documentation.",
  },
  {
    icon: Shield,
    title: "Consumer Law",
    description:
      "Protecting consumer rights before District, State, and National Consumer Disputes Redressal Commissions.",
  },
];

/* ── Services ── */
const SERVICES = [
  {
    icon: Users,
    title: "Legal Consultation",
    description:
      "One-on-one consultations to assess your legal situation and outline the best course of action.",
  },
  {
    icon: Gavel,
    title: "Court Representation",
    description:
      "Skilled advocacy before the Supreme Court of India, all High Courts, District Courts, and Tribunals across the country.",
  },
  {
    icon: FileText,
    title: "Legal Documentation",
    description:
      "Precise drafting of agreements, petitions, wills, and all legal instruments.",
  },
  {
    icon: Bell,
    title: "Legal Notices",
    description:
      "Drafting and sending legally sound notices under the Code of Civil Procedure, Contract Act, and other statutes to protect your rights before litigation.",
  },
  {
    icon: Briefcase,
    title: "Legal Advice & Opinions",
    description:
      "Detailed written opinions and legal advice on complex matters for individuals and businesses.",
  },
  {
    icon: Scale,
    title: "Arbitration & Mediation",
    description:
      "Cost-effective dispute resolution through arbitration and mediation as alternatives to litigation.",
  },
  {
    icon: Award,
    title: "Appeal Filing",
    description:
      "Strategic preparation and filing of appeals before appellate courts with comprehensive brief writing.",
  },
];

/* ── Why choose us ── */
const WHY_US = [
  {
    icon: Award,
    title: "10+ Years of Experience",
    description:
      "Extensive courtroom experience across Supreme Court, High Court and District Court jurisdictions.",
  },
  {
    icon: Users,
    title: "Client-Focused Approach",
    description:
      "Every client receives personal attention and a tailored legal strategy for their unique case.",
  },
  {
    icon: Shield,
    title: "Strict Confidentiality",
    description:
      "Your information and legal matters are handled with the utmost discretion and privacy.",
  },
  {
    icon: TrendingUp,
    title: "Transparent & Affordable",
    description:
      "Clear fee structures with no hidden costs, making quality legal representation accessible to all.",
  },
];

/* ── Stats ── */
const STATS = [
  { value: "500+", label: "Cases Won" },
  { value: "10+", label: "Years Experience" },
  { value: "1000+", label: "Happy Clients" },
  { value: "98%", label: "Success Rate" },
];

/* ══════════════════════════════════════════════
   LEGAL DISCLAIMER MODAL
══════════════════════════════════════════════ */
function LegalDisclaimerModal({
  onAgree,
  onDisagree,
}: {
  onAgree: () => void;
  onDisagree: () => void;
}) {
  return (
    <motion.div
      key="disclaimer-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      data-ocid="disclaimer.modal"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(10,15,40,0.97) 0%, rgba(5,7,18,0.99) 100%)",
        backdropFilter: "blur(6px)",
      }}
      // biome-ignore lint/a11y/useSemanticElements: motion.div cannot be converted to dialog element while preserving animation
      aria-modal="true"
      role="dialog"
      aria-labelledby="disclaimer-title"
    >
      {/* Subtle animated background lines */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(201,168,76,0.04) 48px, rgba(201,168,76,0.04) 49px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "700px",
          maxHeight: "95vh",
          overflowY: "auto",
          background:
            "linear-gradient(160deg, #0e1630 0%, #0a0f24 60%, #06091a 100%)",
          border: "1px solid rgba(201,168,76,0.35)",
          borderRadius: "4px",
          boxShadow:
            "0 0 0 1px rgba(201,168,76,0.1), 0 40px 120px rgba(0,0,0,0.8), 0 0 80px rgba(201,168,76,0.08) inset",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(201,168,76,0.3) transparent",
        }}
      >
        {/* Header ornament */}
        <div
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
            height: "2px",
            width: "100%",
          }}
        />

        {/* Scale icon header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 16px 0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(201,168,76,0.12)",
              border: "1.5px solid rgba(201,168,76,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              boxShadow: "0 0 24px rgba(201,168,76,0.18)",
            }}
          >
            <Scale className="h-7 w-7" style={{ color: "#c9a84c" }} />
          </div>
          <p
            style={{
              color: "rgba(201,168,76,0.6)",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            UPADHYAY LAW CHAMBERS
          </p>
        </div>

        {/* ── PART 1: English Legal Text ── */}
        <div style={{ padding: "0 16px 0" }}>
          <h1
            id="disclaimer-title"
            className="font-display"
            style={{
              color: "#c9a84c",
              fontSize: "clamp(18px, 3vw, 22px)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textAlign: "center",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            Legal Disclaimer &amp; Notice
          </h1>
          <p
            style={{
              color: "rgba(201,168,76,0.65)",
              fontSize: "11px",
              textAlign: "center",
              letterSpacing: "0.05em",
              marginBottom: "20px",
              fontStyle: "italic",
            }}
          >
            As Per Bar Council of India Rules &amp; Delhi High Court Guidelines
          </p>

          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: "3px",
              padding: "20px 22px",
              fontSize: "13px",
              lineHeight: "1.75",
              color: "rgba(230,220,195,0.88)",
            }}
          >
            <p style={{ marginBottom: "14px" }}>
              In accordance with the Bar Council of India Rules, 1975 (Part VI,
              Chapter II, Rule 36) and the guidelines issued by the Hon'ble
              Delhi High Court, advocates are prohibited from advertising or
              soliciting work, either directly or indirectly.
            </p>
            <p style={{ marginBottom: "14px" }}>
              This website —{" "}
              <span style={{ color: "#c9a84c", fontWeight: 600 }}>
                upadhyaylawz.in
              </span>{" "}
              — has been created solely for informational purposes and does not
              constitute an advertisement, solicitation, or invitation to engage
              legal services. The information provided herein is general in
              nature and should not be construed as legal advice.
            </p>
            <ul
              style={{
                margin: "0 0 14px 0",
                padding: "0",
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {[
                "No attorney-client relationship is established by browsing this website.",
                "The firm/advocate shall not be liable for any action taken based on the content herein.",
                "Past results do not guarantee future outcomes.",
                "All information is subject to change without prior notice.",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: "#c9a84c",
                      flexShrink: 0,
                      marginTop: "2px",
                      fontSize: "12px",
                    }}
                  >
                    ◆
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p
              style={{
                fontStyle: "italic",
                color: "rgba(201,168,76,0.85)",
                fontSize: "12.5px",
                borderTop: "1px solid rgba(201,168,76,0.15)",
                paddingTop: "12px",
                marginTop: "8px",
              }}
            >
              By proceeding, you acknowledge that you are seeking information
              voluntarily and that you have not been solicited in any manner
              whatsoever.
            </p>
          </div>
        </div>

        {/* ── Decorative Divider ── */}
        <div
          style={{
            margin: "16px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
          aria-hidden="true"
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))",
            }}
          />
          <Scale
            className="h-4 w-4"
            style={{ color: "rgba(201,168,76,0.55)" }}
          />
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)",
            }}
          />
        </div>

        {/* ── PART 2: Hindi Explanation ── */}
        <div style={{ padding: "0 16px 0" }}>
          <h2
            className="font-display"
            style={{
              color: "#c9a84c",
              fontSize: "clamp(15px, 2.5vw, 18px)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "16px",
              lineHeight: 1.4,
            }}
          >
            यह नोटिस क्यों जरूरी है?{" "}
            <span style={{ color: "rgba(201,168,76,0.6)", fontSize: "0.85em" }}>
              (Why is this notice mandatory?)
            </span>
          </h2>

          <div
            style={{
              background: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: "3px",
              padding: "20px 22px",
              fontSize: "13.5px",
              lineHeight: "1.85",
              color: "rgba(230,220,195,0.88)",
            }}
          >
            <p
              style={{
                marginBottom: "12px",
                fontWeight: 600,
                color: "rgba(230,220,195,0.95)",
              }}
            >
              प्रिय आगंतुक,
            </p>
            <p style={{ marginBottom: "12px" }}>
              भारत में बार काउंसिल ऑफ इंडिया के नियमों के अनुसार, कोई भी वकील अपनी कानूनी
              सेवाओं का विज्ञापन नहीं कर सकता। यह नियम इसलिए बनाया गया है ताकि कानूनी
              पेशे की गरिमा और शुचिता बनी रहे।
            </p>
            <p style={{ marginBottom: "12px" }}>
              यह वेबसाइट केवल आपको जानकारी देने के उद्देश्य से बनाई गई है — न कि किसी
              प्रकार के विज्ञापन या व्यवसाय के लिए। दिल्ली हाई कोर्ट और बार काउंसिल के
              दिशा-निर्देशों का पालन करते हुए, यह नोटिस दिखाना अनिवार्य है।
            </p>
            <p style={{ marginBottom: "12px" }}>
              आपसे अनुरोध है कि इस नोटिस को ध्यान से पढ़ें और आगे बढ़ने से पहले अपनी सहमति दें।
            </p>
            <p style={{ color: "rgba(201,168,76,0.8)", fontWeight: 600 }}>
              धन्यवाद।
            </p>
          </div>
        </div>

        {/* ── Buttons ── */}
        <div
          style={{
            padding: "20px 16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Agree button – prominent gold */}
          <button
            type="button"
            data-ocid="disclaimer.confirm_button"
            onClick={onAgree}
            style={{
              width: "100%",
              maxWidth: "320px",
              padding: "14px 28px",
              background:
                "linear-gradient(135deg, #d4af37 0%, #c9a84c 50%, #b8922e 100%)",
              color: "#0a0f1e",
              fontWeight: 700,
              fontSize: "14.5px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              letterSpacing: "0.04em",
              boxShadow:
                "0 0 0 1px rgba(201,168,76,0.5), 0 4px 20px rgba(201,168,76,0.4), 0 0 40px rgba(201,168,76,0.15)",
              transition:
                "transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(1.12)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 0 0 1px rgba(201,168,76,0.7), 0 8px 30px rgba(201,168,76,0.55), 0 0 50px rgba(201,168,76,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 0 0 1px rgba(201,168,76,0.5), 0 4px 20px rgba(201,168,76,0.4), 0 0 40px rgba(201,168,76,0.15)";
            }}
          >
            ✓ &nbsp;मैं सहमत हूँ &nbsp;|&nbsp; I Agree &amp; Proceed
          </button>

          {/* Disagree button – clearly visible outlined red */}
          <button
            type="button"
            data-ocid="disclaimer.cancel_button"
            onClick={onDisagree}
            style={{
              width: "100%",
              maxWidth: "320px",
              padding: "13px 24px",
              background: "transparent",
              color: "#e05c5c",
              fontWeight: 600,
              fontSize: "13.5px",
              border: "1.5px solid rgba(224,92,92,0.65)",
              borderRadius: "3px",
              cursor: "pointer",
              letterSpacing: "0.04em",
              boxShadow: "0 0 0 0 transparent",
              transition:
                "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(224,92,92,0.1)";
              e.currentTarget.style.borderColor = "rgba(224,92,92,0.9)";
              e.currentTarget.style.boxShadow = "0 0 12px rgba(224,92,92,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(224,92,92,0.65)";
              e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
            }}
          >
            ✕ &nbsp;I Disagree
          </button>
        </div>

        {/* Footer note */}
        <div
          style={{
            padding: "0 16px 16px",
            textAlign: "center",
            color: "rgba(201,168,76,0.35)",
            fontSize: "10.5px",
            letterSpacing: "0.04em",
          }}
        >
          Bar Council of India Rules, 1975 — Rule 36 &nbsp;|&nbsp; Delhi High
          Court Guidelines on Advocate Advertising
        </div>

        {/* Bottom ornament */}
        <div
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)",
            height: "2px",
            width: "100%",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP COMPONENT
══════════════════════════════════════════════ */
export default function App() {
  const isAdmin =
    new URLSearchParams(window.location.search).get("admin") === "true";
  const [showDisclaimer, setShowDisclaimer] = useState(() =>
    isAdmin ? true : !localStorage.getItem("ulc_disclaimer_agreed"),
  );
  const [page, setPage] = useState<"home" | "associates">("home");
  const [_menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    if (href === "#associates") {
      setPage("associates");
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setMenuOpen(false);
      if (page !== "home") {
        setPage("home");
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 80);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen font-body">
      {/* ─────────── LEGAL DISCLAIMER MODAL ─────────── */}
      <AnimatePresence>
        {showDisclaimer && (
          <LegalDisclaimerModal
            onAgree={() => {
              if (!isAdmin) {
                localStorage.setItem("ulc_disclaimer_agreed", "true");
              }
              setShowDisclaimer(false);
            }}
            onDisagree={() => {
              if (isAdmin) {
                setShowDisclaimer(false);
              } else {
                window.location.reload();
              }
            }}
          />
        )}
      </AnimatePresence>

      <Toaster position="top-right" richColors />

      {/* ─────────── FLOATING WHATSAPP BUTTON ─────────── */}
      <a
        href="https://wa.me/919654083085?text=Hello%2C%20Advocate%20Sachin%20Upadhyay%20I%20visited%20your%20website%20and%20I%20am%20looking%20for%20legal%20assistance%20regarding%20a%20matter.%20Could%20you%20please%20let%20me%20know%20your%20availability%20for%20a%20consultation%3F"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        data-ocid="whatsapp.float.button"
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.45, 1], opacity: [0.55, 0, 0.55] }}
          transition={{
            duration: 2.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-[#25D366]"
        />
        {/* Button */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="relative w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:brightness-110 transition-filter duration-200"
          style={{ filter: "drop-shadow(0 4px 16px rgba(37,211,102,0.45))" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 md:h-7 md:w-7 text-white"
            role="img"
            aria-label="WhatsApp"
          >
            <title>WhatsApp</title>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.div>
        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-gray-900/90 text-white text-xs font-medium px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* ─────────── NAVBAR ─────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-crimson-deep/97 backdrop-blur-md shadow-lg shadow-black/30"
            : "bg-crimson-deep/80 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => {
              if (page === "associates") {
                setPage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                scrollTo("#home");
              }
            }}
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="UPADHYAY LAW CHAMBERS – Home"
          >
            <img
              src="/assets/generated/logo-transparent.dim_400x400.png"
              alt="UPADHYAY LAW CHAMBERS"
              className="h-14 sm:h-20 w-auto object-contain max-w-[200px] sm:max-w-[240px]"
            />
          </button>

          {/* Nav links – always visible, scrollable on mobile */}
          <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
            <ul className="flex items-center gap-0 whitespace-nowrap min-w-0">
              {NAV_LINKS.map((link, i) => {
                const isActive =
                  link.href === "#associates" && page === "associates";
                return (
                  <li key={link.href} className="shrink-0">
                    <a
                      href={link.href}
                      data-ocid={NAV_OCIDS[i]}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`relative px-2 py-3 text-[11px] md:px-4 md:py-5 md:text-sm font-display font-medium tracking-wide transition-colors duration-200 block group ${
                        isActive ? "text-gold" : "text-cream/80 hover:text-gold"
                      }`}
                      style={{ touchAction: "manipulation" }}
                    >
                      <span className="md:hidden">{link.shortLabel}</span>
                      <span className="hidden md:inline">{link.label}</span>
                      {/* Gold underline indicator */}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gold transition-transform duration-200 origin-center ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      {page === "associates" ? (
        <AssociatesPage onBack={() => setPage("home")} />
      ) : (
        <>
          <main>
            {/* ─────────── HERO ─────────── */}
            <section
              id="home"
              className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
              {/* Background image */}
              {/* Lady of Justice background with zoom-in animation */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('/assets/generated/lady-of-justice-hero.dim_1920x1080.jpg')",
                }}
                initial={{ scale: 1.12, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
              />
              {/* Dark overlay - slightly lighter to reveal the image */}
              <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.04_245/0.75)] via-[oklch(0.13_0.05_245/0.65)] to-[oklch(0.10_0.04_245/0.88)]" />
              {/* Golden radial glow from center */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.75 0.18 85 / 0.12) 0%, transparent 70%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, delay: 0.8 }}
              />
              {/* Subtle shimmer pulse on the gold glow */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 40% at 50% 35%, oklch(0.85 0.20 85 / 0.08) 0%, transparent 60%)",
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              {/* Gold line accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

              <div className="relative z-10 container mx-auto px-4 text-center pt-32 sm:pt-40 pb-20 sm:pb-28">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
                    },
                  }}
                  className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-cream leading-[1.1] mb-4"
                >
                  {["UPADHYAY", "LAW", "CHAMBERS"].map((word) => (
                    <motion.span
                      key={word}
                      variants={{
                        hidden: { opacity: 0, y: 48, rotateX: -15 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      className="inline-block mr-[0.25em] last:mr-0"
                      style={{ display: "inline-block" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                  className="text-cream/80 text-base sm:text-lg max-w-2xl mx-auto mb-2 font-display font-medium tracking-wide"
                >
                  Adv. Sachin Upadhyay
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="text-cream/65 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
                >
                  10+ Years Practice &nbsp;|&nbsp; Supreme Court of India
                  &nbsp;|&nbsp; All High Courts &amp; District Courts
                </motion.p>

                {/* ── Office quick-info strip ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
                  data-ocid="hero.office.card"
                  className="mt-12 flex flex-col sm:flex-row w-full sm:w-auto items-center justify-center gap-0 rounded-sm overflow-hidden border border-gold/25 shadow-gold/10 shadow-lg mx-auto"
                >
                  <a
                    href="https://maps.google.com/?q=Tis+Hazari+Courts+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-crimson-deep/90 backdrop-blur-sm hover:bg-crimson-mid/90 transition-colors duration-200 px-5 py-3 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-gold/20"
                  >
                    <MapPin className="h-4 w-4 text-gold flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-gold text-[9px] font-semibold tracking-widest uppercase leading-none mb-0.5">
                        Office
                      </div>
                      <div className="text-cream text-xs leading-snug">
                        Chamber No. 44, Western Wing, Tis Hazari Courts
                      </div>
                    </div>
                  </a>
                  <a
                    href="tel:+919654083085"
                    className="flex items-center gap-2.5 bg-crimson-deep/90 backdrop-blur-sm hover:bg-crimson-mid/90 transition-colors duration-200 px-5 py-3 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-gold/20"
                  >
                    <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-gold text-[9px] font-semibold tracking-widest uppercase leading-none mb-0.5">
                        Call Us
                      </div>
                      <div className="text-cream text-xs">
                        +91 96540 83085 / 87505 05255
                      </div>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              >
                <span className="text-cream/45 text-xs tracking-widest uppercase">
                  Scroll
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="h-5 w-5 text-gold/60" />
                </motion.div>
              </motion.div>
            </section>

            {/* ─────────── ABOUT ─────────── */}
            <section id="about" className="py-14 md:py-24 bg-background">
              <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Image column */}
                  <FadeIn>
                    <div className="relative">
                      <div className="absolute -top-4 -left-4 w-full h-full bg-gold/10 rounded-sm" />
                      <div className="relative border-2 border-gold/30 rounded-sm overflow-hidden">
                        <img
                          src="/assets/generated/advocate-portrait.dim_600x700.jpg"
                          alt="Adv. Sachin Upadhyay"
                          className="w-full object-cover max-h-72 sm:max-h-none"
                        />
                      </div>
                      {/* Floating credential badge */}
                      <div className="hidden sm:block absolute -bottom-5 -right-5 bg-crimson-deep text-cream p-4 rounded-sm shadow-crimson border border-gold/20 max-w-[180px]">
                        <div className="text-gold text-xs font-semibold tracking-wider uppercase mb-1">
                          Bar Enrolled
                        </div>
                        <div className="text-sm font-display font-bold leading-tight">
                          Bar Council of Delhi
                        </div>
                        <div className="text-cream/65 text-xs mt-1">
                          Since 2014
                        </div>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Text column */}
                  <FadeIn delay={0.15}>
                    <div>
                      <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                        About The Advocate
                      </div>
                      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        Adv. Sachin Upadhyay
                      </h2>
                      <div className="w-16 h-0.5 bg-gold mb-6" />

                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Advocate Sachin Upadhyay is a distinguished legal
                        professional enrolled with the Bar Council of Delhi,
                        with dedicated practice before the Supreme Court of
                        India, Delhi High Court, various High Courts across
                        India, and all District Courts. His practice spans
                        criminal defense, civil litigation, corporate advisory,
                        and family law.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        Known for his meticulous case preparation, sharp
                        courtroom advocacy, and unwavering commitment to client
                        interests, Adv. Upadhyay has secured favorable outcomes
                        in over 500 cases across diverse legal domains. With 10+
                        years of dedicated practice, UPADHYAY LAW CHAMBERS
                        stands as a trusted name in Indian legal services.
                      </p>

                      {/* Credentials */}
                      <ul className="space-y-2.5 mb-10">
                        {[
                          "Enrolled with Bar Council of Delhi",
                          "Practicing before Supreme Court of India",
                          "Member, Delhi High Court Bar Association",
                          "Specialization in Criminal & Civil Litigation",
                          "Chamber No. 44, Western Wing, Tis Hazari Courts, Delhi",
                        ].map((cred) => (
                          <li
                            key={cred}
                            className="flex items-start gap-2.5 text-sm text-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {STATS.map((stat) => (
                          <AnimatedCounter
                            key={stat.label}
                            value={stat.value}
                            label={stat.label}
                          />
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* ─────────── PRACTICE AREAS ─────────── */}
            <section id="practice" className="py-14 md:py-24 bg-crimson-deep">
              <div className="container mx-auto px-4">
                <FadeIn className="text-center mb-10 md:mb-16">
                  <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                    Areas of Expertise
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
                    Practice Areas
                  </h2>
                  <p className="text-cream/65 max-w-xl mx-auto leading-relaxed">
                    Comprehensive legal representation across multiple domains
                    of law with deep expertise and proven track record.
                  </p>
                </FadeIn>

                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                >
                  {PRACTICE_AREAS.map((area, i) => (
                    <motion.div key={area.title} variants={staggerItem}>
                      <div
                        data-ocid={`practice.item.${i + 1}`}
                        className="group bg-crimson-mid/60 border border-white/10 hover:border-gold/60 rounded-sm p-4 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(201,168,76,0.22)]"
                      >
                        <div className="w-12 h-12 rounded-sm bg-gold/15 border border-gold/25 flex items-center justify-center mb-5 group-hover:bg-gold/25 transition-colors duration-300">
                          <area.icon className="h-6 w-6 text-gold" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-cream mb-3">
                          {area.title}
                        </h3>
                        <p className="text-cream/60 text-sm leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ─────────── SERVICES ─────────── */}
            <section id="services" className="py-14 md:py-24 bg-background">
              <div className="container mx-auto px-4">
                <FadeIn className="text-center mb-10 md:mb-16">
                  <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                    What We Offer
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Legal Services
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    End-to-end legal support from initial consultation to final
                    verdict and beyond.
                  </p>
                </FadeIn>

                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                >
                  {SERVICES.map((service) => (
                    <motion.div key={service.title} variants={staggerItem}>
                      <div className="group relative bg-card border border-border hover:border-gold/50 rounded-sm p-4 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(201,168,76,0.18)]">
                        <div className="absolute top-0 left-0 w-1 h-0 bg-gold rounded-tl-sm group-hover:h-full transition-all duration-300" />
                        <service.icon className="h-7 w-7 text-gold mb-4" />
                        <h3 className="font-display text-lg font-bold text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ─────────── WHY CHOOSE US ─────────── */}
            <section className="py-20 bg-secondary/60">
              <div className="container mx-auto px-4">
                <FadeIn className="text-center mb-14">
                  <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                    The UPADHYAY LAW CHAMBERS Advantage
                  </div>
                  <h2 className="font-display text-4xl font-bold text-foreground">
                    Why Choose Us
                  </h2>
                </FadeIn>

                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                >
                  {WHY_US.map((item) => (
                    <motion.div key={item.title} variants={staggerItem}>
                      <div className="text-center p-4 sm:p-6">
                        <div className="w-14 h-14 rounded-full bg-crimson-deep mx-auto flex items-center justify-center mb-4 shadow-crimson">
                          <item.icon className="h-7 w-7 text-gold" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* ─────────── COURTS WE PRACTICE IN ─────────── */}
            <section id="courts" className="py-14 md:py-24 bg-crimson-deep">
              <div className="container mx-auto px-4">
                <FadeIn className="text-center mb-10 md:mb-16">
                  <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                    Pan-India Practice
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
                    Courts We Practice In
                  </h2>
                  <p className="text-cream/65 max-w-2xl mx-auto leading-relaxed">
                    We represent clients before all major courts and tribunals
                    across India — from the Supreme Court to District Courts in
                    every state.
                  </p>
                </FadeIn>

                {/* Supreme Court – Featured Card */}
                <FadeIn delay={0.1}>
                  <div
                    data-ocid="courts.supreme.card"
                    className="mb-10 border border-gold/40 rounded-sm overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-gold/20 to-gold/5 px-4 py-4 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center gap-5">
                      <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center flex-shrink-0">
                        <Landmark className="h-8 w-8 text-gold" />
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">
                          Apex Court of India
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-1">
                          Supreme Court of India
                        </h3>
                        <p className="text-cream/65 text-sm">
                          New Delhi — Highest constitutional court. SLPs, Writ
                          Petitions, Constitutional Matters &amp; Appeals.
                        </p>
                      </div>
                      <div className="sm:ml-auto flex-shrink-0">
                        <span className="inline-flex items-center gap-1.5 bg-gold/20 border border-gold/30 text-gold text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
                          <Scale className="h-3 w-3" />
                          Supreme Court
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* High Courts */}
                <FadeIn delay={0.15}>
                  <div
                    data-ocid="courts.highcourt.card"
                    className="mb-10 border border-gold/40 rounded-sm overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-gold/15 to-gold/5 px-4 py-4 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center gap-5">
                      <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-8 w-8 text-gold" />
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">
                          Pan-India
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream mb-1">
                          High Courts
                        </h3>
                        <p className="text-cream/65 text-sm">
                          Practice before all High Courts across India — Delhi,
                          Bombay, Calcutta, Madras, Allahabad &amp; more.
                        </p>
                      </div>
                      <div className="sm:ml-auto flex-shrink-0">
                        <span className="inline-flex items-center gap-1.5 bg-gold/20 border border-gold/30 text-gold text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
                          <Building2 className="h-3 w-3" />
                          High Court
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          </main>
          <footer className="bg-crimson-deep border-t border-white/10">
            <div className="container mx-auto px-4 py-10 md:py-14">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-12">
                {/* Brand */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src="/assets/generated/logo-transparent.dim_400x400.png"
                      alt="UPADHYAY LAW CHAMBERS"
                      className="h-20 w-auto object-contain max-w-[200px]"
                    />
                  </div>
                  <p className="text-cream/55 text-sm leading-relaxed">
                    Providing trusted legal counsel to individuals and
                    businesses across India since 2014. Supreme Court &amp; All
                    India Practice.
                  </p>
                </div>

                {/* Quick links */}
                <div>
                  <h4 className="text-cream font-semibold text-sm tracking-wider uppercase mb-5">
                    Quick Links
                  </h4>
                  <ul className="space-y-2.5">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          data-ocid={
                            link.href === "#associates"
                              ? "footer.associates.link"
                              : undefined
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }}
                          className="text-cream/55 hover:text-gold text-sm transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practice areas */}
                <div>
                  <h4 className="text-cream font-semibold text-sm tracking-wider uppercase mb-5">
                    Practice Areas
                  </h4>
                  <ul className="space-y-2.5">
                    {PRACTICE_AREAS.map((a) => (
                      <li key={a.title}>
                        <button
                          type="button"
                          onClick={() => scrollTo("#practice")}
                          className="text-cream/55 hover:text-gold text-sm transition-colors duration-200 text-left"
                        >
                          {a.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-cream font-semibold text-sm tracking-wider uppercase mb-5">
                    Contact
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:sachinupadhayay146@gmail.com"
                        className="text-cream/55 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2"
                      >
                        <span className="text-gold">✉</span>
                        sachinupadhayay146@gmail.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com/its_adv_sachin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream/55 hover:text-gold text-sm transition-colors duration-200 flex items-center gap-2"
                      >
                        <span className="text-gold">📷</span>
                        @its_adv_sachin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-cream/45 text-xs text-center sm:text-left">
                  © {currentYear} UPADHYAY LAW CHAMBERS | Adv. Sachin Upadhyay.
                  All rights reserved.
                </p>
                <p className="text-cream/35 text-xs text-center">
                  Built with <span className="text-red-400">♥</span> using{" "}
                  <a
                    href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-light transition-colors duration-200"
                  >
                    caffeine.ai
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
