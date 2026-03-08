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
  Briefcase,
  Building,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
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
  Quote,
  Scale,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import AssociatesPage from "./AssociatesPage";
import { LegalMatterType } from "./backend.d";
import {
  useGetAllTestimonials,
  useSubmitContactForm,
} from "./hooks/useQueries";

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

/* ── Star rating ── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${s <= rating ? "fill-gold text-gold" : "fill-muted text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

/* ── Sample testimonials (fallback) ── */
const SAMPLE_TESTIMONIALS = [
  {
    clientName: "Md. Mahfooj",
    starRating: 5,
    caseType: "Criminal",
    reviewText:
      "Adv. Sachin Upadhyay provided outstanding criminal defense. His sharp legal strategy and thorough preparation made all the difference. I am deeply grateful for his dedication and expertise.",
  },
  {
    clientName: "Ateek Ahmad",
    starRating: 5,
    caseType: "Criminal",
    reviewText:
      "Excellent legal counsel in my criminal matter. Adv. Upadhyay was prompt, professional, and fought tirelessly for my rights at Tis Hazari District Courts. Highly recommended.",
  },
  {
    clientName: "Tarjeet Singh",
    starRating: 5,
    caseType: "Criminal",
    reviewText:
      "Adv. Sachin Upadhyay handled my case with great skill and confidence. His knowledge of criminal law is exceptional and he kept me informed at every stage. Very satisfied.",
  },
  {
    clientName: "Nikhil Tewatia",
    starRating: 5,
    caseType: "Criminal",
    reviewText:
      "I could not have asked for a better advocate. Adv. Upadhyay's courtroom presence and legal acumen are truly impressive. He secured the best possible outcome for my case.",
  },
  {
    clientName: "Jyoti",
    starRating: 5,
    caseType: "Family Matter",
    reviewText:
      "During a very sensitive family matter, Adv. Upadhyay showed both legal brilliance and genuine compassion. He guided us through the entire process with patience and care.",
  },
  {
    clientName: "Manohar Singh",
    starRating: 5,
    caseType: "Family Matter",
    reviewText:
      "Adv. Sachin Upadhyay handled our family dispute with utmost professionalism and sensitivity. His advice was practical and he achieved the best resolution for our family.",
  },
  {
    clientName: "Anand Kumar",
    starRating: 5,
    caseType: "Civil",
    reviewText:
      "Outstanding legal support in my civil matter. Adv. Upadhyay's strategic approach and meticulous case preparation delivered excellent results. A truly reliable and knowledgeable advocate.",
  },
];

/* ── Nav links ── */
const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#practice", label: "Practice Areas" },
  { href: "#courts", label: "Courts" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#associates", label: "Associates" },
  { href: "#contact", label: "Contact" },
];

const NAV_OCIDS = [
  "nav.home.link",
  "nav.about.link",
  "nav.practice.link",
  "nav.courts.link",
  "nav.services.link",
  "nav.testimonials.link",
  "nav.associates.link",
  "nav.contact.link",
];

/* ── Practice areas ── */
const PRACTICE_AREAS = [
  {
    icon: Gavel,
    title: "Criminal Law",
    description:
      "Robust defense and prosecution services for criminal matters including bail, trial advocacy, and appeals before High Courts.",
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
      "Precise drafting of agreements, petitions, affidavits, wills, and all legal instruments.",
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

/* ── District Courts ── */
const DISTRICT_COURTS = [
  "Tis Hazari District Courts (Delhi)",
  "Saket Courts (Delhi)",
  "Karkardooma Courts (Delhi)",
  "Rohini Courts (Delhi)",
  "Dwarka Courts (Delhi)",
  "All District Courts across all 28 States & 8 Union Territories",
];

/* ── Contact form ── */
type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  matterType: LegalMatterType | "";
};

const MATTER_TYPE_LABELS: Record<LegalMatterType, string> = {
  [LegalMatterType.criminal]: "Criminal Law",
  [LegalMatterType.civil]: "Civil Law",
  [LegalMatterType.family]: "Family Law",
  [LegalMatterType.corporate]: "Corporate Law",
  [LegalMatterType.property]: "Property Law",
  [LegalMatterType.other]: "Other",
};

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
            Upadhyay Lawz &amp; Consultant
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
  const [showDisclaimer, setShowDisclaimer] = useState(
    () => !localStorage.getItem("ulc_disclaimer_agreed"),
  );
  const [page, setPage] = useState<"home" | "associates">("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    matterType: "",
  });

  const { data: testimonials, isLoading: testimonialsLoading } =
    useGetAllTestimonials();
  const submitMutation = useSubmitContactForm();

  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials.slice(0, 7)
      : SAMPLE_TESTIMONIALS;

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
      setPage("home");
      scrollTo(href);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.matterType) {
      toast.error("Please select a legal matter type.");
      return;
    }
    try {
      await submitMutation.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        matterType: form.matterType as LegalMatterType,
      });
      toast.success(
        "Your consultation request has been submitted! We will contact you shortly.",
      );
      setForm({ name: "", email: "", phone: "", message: "", matterType: "" });
    } catch {
      toast.error("Failed to submit. Please try again or call us directly.");
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
              localStorage.setItem("ulc_disclaimer_agreed", "true");
              setShowDisclaimer(false);
            }}
            onDisagree={() => {
              window.location.reload();
            }}
          />
        )}
      </AnimatePresence>

      <Toaster position="top-right" richColors />

      {/* ─────────── FLOATING WHATSAPP BUTTON ─────────── */}
      <a
        href="https://wa.me/919654083085?text=Hello%2C%20I%20am%20looking%20for%20legal%20assistance.%20Kindly%20guide%20me."
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

      {/* ─────────── TOP INFO BAR ─────────── */}
      <div
        data-ocid="infobar.section"
        className="fixed top-0 left-0 right-0 z-[60] bg-crimson-deep border-b border-gold/20"
        style={{ height: "40px" }}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Address + Phone (always visible) */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
            <a
              href="https://maps.google.com/?q=Tis+Hazari+Courts+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="infobar.address.link"
              className="flex items-center gap-1.5 text-cream/85 hover:text-gold transition-colors duration-200 min-w-0"
            >
              <MapPin className="h-3 w-3 text-gold flex-shrink-0" />
              <span className="text-[11px] tracking-wide truncate hidden sm:block">
                Chamber No. 44, Western Wing, Tis Hazari District Courts, Delhi
                110054
              </span>
              <span className="text-[11px] tracking-wide truncate sm:hidden">
                Tis Hazari District Courts, Delhi
              </span>
            </a>
            <div className="w-px h-3.5 bg-gold/20 flex-shrink-0 hidden sm:block" />
            <a
              href="tel:+919654083085"
              data-ocid="infobar.phone.link"
              className="flex items-center gap-1.5 text-cream/85 hover:text-gold transition-colors duration-200 flex-shrink-0"
            >
              <Phone className="h-3 w-3 text-gold flex-shrink-0" />
              <span className="text-[11px] tracking-wide">
                +91 96540 83085 / 87505 05255
              </span>
            </a>
          </div>

          {/* Hours (right side, hidden on very small screens) */}
          <div className="hidden md:flex items-center gap-1.5 text-cream/65 flex-shrink-0">
            <Clock className="h-3 w-3 text-gold" />
            <span className="text-[11px] tracking-wide">
              Mon–Sat: 9:30 AM – 6:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* ─────────── NAVBAR ─────────── */}
      <header
        className={`fixed top-[40px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-crimson-deep/97 backdrop-blur-md shadow-crimson"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
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
            className="flex items-center gap-2 group"
            aria-label="Upadhyay Lawz & Consultant – Home"
          >
            <img
              src="/assets/generated/upadhyay-lawz-logo-transparent.dim_200x200.png"
              alt="Upadhyay Lawz & Consultant"
              className="h-12 w-auto object-contain"
            />
            <span className="font-display text-xl font-bold text-gold tracking-wide">
              Upadhyay Lawz &amp; Consultant
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={NAV_OCIDS[i]}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2 text-sm transition-colors duration-200 rounded font-display font-medium tracking-wide ${
                    link.href === "#associates" && page === "associates"
                      ? "text-gold"
                      : "text-cream/85 hover:text-gold"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button
              data-ocid="nav.consultation.button"
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex bg-gold hover:bg-gold-dark text-crimson-deep font-semibold text-sm px-5 py-2 shadow-gold transition-all duration-200"
            >
              Book Consultation
            </Button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden text-cream p-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{ touchAction: "manipulation" }}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-crimson-deep/98 backdrop-blur-md border-t border-white/10"
            >
              <ul className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      data-ocid={NAV_OCIDS[i]}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      style={{ touchAction: "manipulation" }}
                      className={`block px-3 py-2.5 transition-colors rounded font-display ${
                        link.href === "#associates" && page === "associates"
                          ? "text-gold"
                          : "text-cream/85 hover:text-gold"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="mt-3">
                  <Button
                    data-ocid="nav.consultation.button"
                    onClick={() => scrollTo("#contact")}
                    className="w-full bg-gold hover:bg-gold-dark text-crimson-deep font-semibold"
                  >
                    Book Consultation
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
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
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    "url('/assets/generated/hero-bg.dim_1440x900.jpg')",
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-crimson-deep/90 via-crimson-deep/80 to-crimson-deep/96" />

              {/* Gold line accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

              <div className="relative z-10 container mx-auto px-4 text-center pt-32 sm:pt-40 pb-20 sm:pb-28">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
                    <Scale className="h-3.5 w-3.5" />
                    <span>Enrolled Bar Council of Delhi</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-cream leading-[1.1] mb-4"
                >
                  Upadhyay Lawz
                  <br />
                  <span className="text-gold italic">&amp; Consultant</span>
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

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button
                    data-ocid="hero.consultation.primary_button"
                    onClick={() => scrollTo("#contact")}
                    size="lg"
                    className="bg-gold hover:bg-gold-dark text-crimson-deep font-bold text-base px-8 py-6 shadow-gold hover:shadow-none transition-all duration-200 rounded-sm"
                  >
                    Book Free Consultation
                  </Button>

                  {/* ── Highlighted Contact Us button ── */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px 0px rgba(212,175,55,0)",
                        "0 0 18px 6px rgba(212,175,55,0.55)",
                        "0 0 0px 0px rgba(212,175,55,0)",
                      ],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="rounded-sm"
                  >
                    <Button
                      data-ocid="hero.contact_button"
                      onClick={() => scrollTo("#contact")}
                      size="lg"
                      className="relative overflow-hidden bg-gradient-to-r from-gold via-amber-400 to-gold text-crimson-deep font-bold text-base px-8 py-6 rounded-sm border-2 border-gold transition-all duration-200 hover:brightness-110 hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Contact Us
                      </span>
                    </Button>
                  </motion.div>

                  <Button
                    data-ocid="hero.learn_more.secondary_button"
                    onClick={() => scrollTo("#about")}
                    size="lg"
                    variant="outline"
                    className="hidden sm:inline-flex border-cream/40 text-cream hover:bg-cream/10 hover:border-cream text-base px-8 py-6 rounded-sm"
                  >
                    Learn More
                  </Button>
                </motion.div>

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
                    className="flex items-center gap-2.5 bg-crimson-deep/80 backdrop-blur-sm hover:bg-crimson-mid/80 transition-colors duration-200 px-5 py-3 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-gold/20"
                  >
                    <MapPin className="h-4 w-4 text-gold flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-gold text-[9px] font-semibold tracking-widest uppercase leading-none mb-0.5">
                        Office
                      </div>
                      <div className="text-cream text-xs leading-snug">
                        Chamber No. 44, Western Wing, Tis Hazari District Courts
                      </div>
                    </div>
                  </a>
                  <a
                    href="tel:+919654083085"
                    className="flex items-center gap-2.5 bg-crimson-deep/80 backdrop-blur-sm hover:bg-crimson-mid/80 transition-colors duration-200 px-5 py-3 w-full sm:w-auto border-b sm:border-b-0 sm:border-r border-gold/20"
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
                  <div className="flex items-center gap-2.5 bg-crimson-deep/80 backdrop-blur-sm px-5 py-3 w-full sm:w-auto">
                    <Clock className="h-4 w-4 text-gold flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-gold text-[9px] font-semibold tracking-widest uppercase leading-none mb-0.5">
                        Hours
                      </div>
                      <div className="text-cream text-xs">
                        Mon–Sat: 9:30 AM – 6:00 PM
                      </div>
                    </div>
                  </div>
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
                        years of dedicated practice, Upadhyay Lawz & Consultant
                        stands as a trusted name in Indian legal services.
                      </p>

                      {/* Credentials */}
                      <ul className="space-y-2.5 mb-10">
                        {[
                          "Enrolled with Bar Council of Delhi",
                          "Practicing before Supreme Court of India",
                          "Member, Delhi High Court Bar Association",
                          "Specialization in Criminal & Civil Litigation",
                          "Chamber No. 44, Western Wing, Tis Hazari District Courts, Delhi",
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
                          <div
                            key={stat.label}
                            className="text-center bg-secondary rounded-sm py-4 px-3"
                          >
                            <div className="font-display text-2xl font-bold text-crimson-deep">
                              {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {stat.label}
                            </div>
                          </div>
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

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRACTICE_AREAS.map((area, i) => (
                    <FadeIn key={area.title} delay={i * 0.08}>
                      <div
                        data-ocid={`practice.item.${i + 1}`}
                        className="group bg-crimson-mid/60 border border-white/10 hover:border-gold/40 rounded-sm p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1"
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
                    </FadeIn>
                  ))}
                </div>
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

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES.map((service, i) => (
                    <FadeIn key={service.title} delay={i * 0.08}>
                      <div className="group relative bg-card border border-border hover:border-gold/50 rounded-sm p-4 sm:p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                        <div className="absolute top-0 left-0 w-1 h-0 bg-gold rounded-tl-sm group-hover:h-full transition-all duration-300" />
                        <service.icon className="h-7 w-7 text-gold mb-4" />
                        <h3 className="font-display text-lg font-bold text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* ─────────── WHY CHOOSE US ─────────── */}
            <section className="py-20 bg-secondary/60">
              <div className="container mx-auto px-4">
                <FadeIn className="text-center mb-14">
                  <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                    The Upadhyay Lawz Advantage
                  </div>
                  <h2 className="font-display text-4xl font-bold text-foreground">
                    Why Choose Us
                  </h2>
                </FadeIn>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {WHY_US.map((item, i) => (
                    <FadeIn key={item.title} delay={i * 0.1}>
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
                    </FadeIn>
                  ))}
                </div>
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

                {/* District Courts */}
                <FadeIn delay={0.2}>
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Building className="h-5 w-5 text-gold" />
                      <h3 className="font-display text-xl font-bold text-cream tracking-wide">
                        District Courts Across India
                      </h3>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {DISTRICT_COURTS.map((court, i) => (
                        <div
                          key={court}
                          data-ocid={`courts.district.item.${i + 1}`}
                          className={`flex items-center gap-3 rounded-sm px-4 py-3 border transition-colors duration-200 group ${
                            i === DISTRICT_COURTS.length - 1
                              ? "bg-gold/10 border-gold/30 sm:col-span-2 lg:col-span-3"
                              : "bg-crimson-mid/50 border-white/10 hover:border-gold/30"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${
                              i === DISTRICT_COURTS.length - 1
                                ? "bg-gold/20"
                                : "bg-gold/10"
                            }`}
                          >
                            <Building2
                              className={`h-4 w-4 ${i === DISTRICT_COURTS.length - 1 ? "text-gold" : "text-gold/70"}`}
                            />
                          </div>
                          <span
                            className={`text-sm leading-tight ${
                              i === DISTRICT_COURTS.length - 1
                                ? "text-gold font-semibold"
                                : "text-cream/80 group-hover:text-cream"
                            } transition-colors duration-200`}
                          >
                            {court}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>

            {/* ─────────── TESTIMONIALS ─────────── */}
            <section id="testimonials" className="py-14 md:py-24 bg-background">
              <div className="container mx-auto px-4">
                <FadeIn className="text-center mb-10 md:mb-16">
                  <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                    Client Voices
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Testimonials
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    What our clients say about their experience working with
                    Upadhyay Lawz &amp; Consultant.
                  </p>
                </FadeIn>

                {testimonialsLoading ? (
                  <div
                    data-ocid="testimonials.loading_state"
                    className="flex justify-center py-16"
                  >
                    <Loader2 className="h-8 w-8 text-gold animate-spin" />
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayTestimonials.map((t, i) => {
                      const caseType = (
                        t as (typeof SAMPLE_TESTIMONIALS)[number] & {
                          caseType?: string;
                        }
                      ).caseType;
                      return (
                        <FadeIn key={t.clientName} delay={i * 0.08}>
                          <div
                            data-ocid={`testimonials.item.${i + 1}`}
                            className="bg-card border border-border hover:border-gold/30 rounded-sm p-5 sm:p-7 relative shadow-card transition-all duration-300 h-full flex flex-col"
                          >
                            <Quote className="absolute top-5 right-5 h-8 w-8 text-gold/20" />
                            <div className="flex items-center justify-between mb-3">
                              <StarRating rating={Number(t.starRating)} />
                              {caseType && (
                                <span className="text-[10px] font-semibold tracking-wider uppercase bg-crimson-deep/10 text-crimson-deep border border-crimson-deep/20 px-2 py-0.5 rounded-full">
                                  {caseType}
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mt-2 mb-5 flex-1">
                              "{t.reviewText}"
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-crimson-deep/10 border border-gold/30 flex items-center justify-center">
                                <span className="text-gold font-bold text-sm">
                                  {t.clientName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="text-foreground font-semibold text-sm">
                                  {t.clientName}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  Verified Client
                                </div>
                              </div>
                            </div>
                          </div>
                        </FadeIn>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* ─────────── CONTACT ─────────── */}
            <section id="contact" className="py-14 md:py-24 bg-secondary/30">
              <div className="container mx-auto px-4">
                <FadeIn className="text-center mb-10 md:mb-16">
                  <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                    Get In Touch
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Book a Consultation
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    Reach out to discuss your legal matter with Upadhyay Lawz
                    &amp; Consultant. The first consultation is free.
                  </p>
                </FadeIn>

                <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
                  {/* Info column */}
                  <FadeIn className="lg:col-span-2 order-last lg:order-none">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-sm bg-crimson-deep flex items-center justify-center flex-shrink-0 shadow-crimson">
                          <MapPin className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-gold font-semibold tracking-wider uppercase mb-1">
                            Office Address
                          </div>
                          <div className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                            Chamber No. 44, Western Wing{"\n"}Tis Hazari
                            District Courts, Delhi 110054
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-sm bg-crimson-deep flex items-center justify-center flex-shrink-0 shadow-crimson">
                          <Phone className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-gold font-semibold tracking-wider uppercase mb-1">
                            Phone
                          </div>
                          <div className="text-foreground text-sm leading-relaxed">
                            <a
                              href="tel:+919654083085"
                              className="hover:text-gold transition-colors"
                            >
                              +91 96540 83085
                            </a>
                            <br />
                            <a
                              href="tel:+918750505255"
                              className="hover:text-gold transition-colors"
                            >
                              +91 87505 05255
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* WhatsApp */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-sm bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-sm">
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 text-white"
                            role="img"
                            aria-label="WhatsApp"
                          >
                            <title>WhatsApp</title>
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gold font-semibold tracking-wider uppercase mb-1">
                            WhatsApp
                          </div>
                          <div className="text-foreground text-sm leading-relaxed">
                            <a
                              href="https://wa.me/919654083085?text=Hello%2C%20I%20am%20looking%20for%20legal%20assistance.%20Kindly%20guide%20me."
                              target="_blank"
                              rel="noopener noreferrer"
                              data-ocid="contact.whatsapp.button"
                              className="hover:text-[#25D366] transition-colors font-medium"
                            >
                              Chat on WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-sm bg-crimson-deep flex items-center justify-center flex-shrink-0 shadow-crimson">
                          <Mail className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-gold font-semibold tracking-wider uppercase mb-1">
                            Email
                          </div>
                          <div className="text-foreground text-sm leading-relaxed">
                            <a
                              href="mailto:sachinupadhayay146@gmail.com"
                              className="hover:text-gold transition-colors break-all"
                            >
                              sachinupadhayay146@gmail.com
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-sm bg-crimson-deep flex items-center justify-center flex-shrink-0 shadow-crimson">
                          <Users className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-gold font-semibold tracking-wider uppercase mb-1">
                            Social / Instagram
                          </div>
                          <div className="text-foreground text-sm leading-relaxed">
                            <a
                              href="https://www.instagram.com/advocatesachinupadhyay"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-gold transition-colors"
                            >
                              @advocatesachinupadhyay
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-sm bg-crimson-deep flex items-center justify-center flex-shrink-0 shadow-crimson">
                          <Clock className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="text-xs text-gold font-semibold tracking-wider uppercase mb-1">
                            Office Hours
                          </div>
                          <div className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                            Mon – Sat: 9:30 AM – 6:00 PM{"\n"}Sunday: By
                            Appointment
                          </div>
                        </div>
                      </div>

                      {/* Tis Hazari Court Map */}
                      <div className="mt-2">
                        <div className="text-xs text-gold font-semibold tracking-wider uppercase mb-3">
                          Location – Tis Hazari District Courts
                        </div>
                        <div className="rounded-sm overflow-hidden border border-gold/20 shadow-sm">
                          <iframe
                            title="Tis Hazari District Courts Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.168822898716!2d77.21390261508257!3d28.669485982393686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0f8e87529d%3A0xd8cc3882cd9e9b69!2sTis%20Hazari%20Court!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                        <a
                          href="https://maps.google.com/?q=Tis+Hazari+Courts+Delhi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-dark transition-colors mt-2"
                        >
                          <MapPin className="h-3 w-3" />
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Form column */}
                  <FadeIn
                    delay={0.12}
                    className="lg:col-span-3 order-first lg:order-none"
                  >
                    <form
                      onSubmit={handleSubmit}
                      className="bg-card border border-border rounded-sm p-4 sm:p-7 shadow-card"
                    >
                      <h3 className="font-display text-xl font-bold text-foreground mb-6">
                        Send Us a Message
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label
                            htmlFor="name"
                            className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 block"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            data-ocid="contact.name.input"
                            value={form.name}
                            onChange={handleFormChange}
                            required
                            placeholder="Your full name"
                            className="rounded-sm"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 block"
                          >
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            data-ocid="contact.email.input"
                            value={form.email}
                            onChange={handleFormChange}
                            required
                            placeholder="your@email.com"
                            className="rounded-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 block"
                          >
                            Phone *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            data-ocid="contact.phone.input"
                            value={form.phone}
                            onChange={handleFormChange}
                            required
                            placeholder="+91 96540 83085"
                            className="rounded-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 block">
                            Legal Matter *
                          </Label>
                          <Select
                            value={form.matterType}
                            onValueChange={(val) =>
                              setForm((prev) => ({
                                ...prev,
                                matterType: val as LegalMatterType,
                              }))
                            }
                          >
                            <SelectTrigger
                              data-ocid="contact.matter.select"
                              className="rounded-sm"
                            >
                              <SelectValue placeholder="Select matter type" />
                            </SelectTrigger>
                            <SelectContent>
                              {(
                                Object.entries(MATTER_TYPE_LABELS) as [
                                  LegalMatterType,
                                  string,
                                ][]
                              ).map(([val, label]) => (
                                <SelectItem key={val} value={val}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <Label
                          htmlFor="message"
                          className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 block"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          data-ocid="contact.message.textarea"
                          value={form.message}
                          onChange={handleFormChange}
                          required
                          rows={4}
                          placeholder="Briefly describe your legal matter..."
                          className="rounded-sm resize-none"
                        />
                      </div>

                      {/* States */}
                      <AnimatePresence mode="wait">
                        {submitMutation.isSuccess && (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            data-ocid="contact.success_state"
                            className="mb-4 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-sm px-4 py-3"
                          >
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                            <span>
                              Your consultation request has been received! We'll
                              contact you within 24 hours.
                            </span>
                          </motion.div>
                        )}
                        {submitMutation.isError && (
                          <motion.div
                            key="error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            data-ocid="contact.error_state"
                            className="mb-4 flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3"
                          >
                            <X className="h-4 w-4 flex-shrink-0" />
                            <span>
                              Submission failed. Please try again or call us at
                              +91 96540 83085.
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        type="submit"
                        data-ocid="contact.submit.submit_button"
                        disabled={submitMutation.isPending}
                        className="w-full bg-crimson-deep hover:bg-crimson-mid text-cream font-semibold py-5 rounded-sm shadow-crimson transition-all duration-200"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2
                              data-ocid="contact.loading_state"
                              className="mr-2 h-4 w-4 animate-spin"
                            />
                            Submitting...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </FadeIn>
                </div>
              </div>
            </section>
          </main>

          {/* ─────────── FOOTER ─────────── */}
          <footer className="bg-crimson-deep border-t border-white/10">
            <div className="container mx-auto px-4 py-10 md:py-14">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-12">
                {/* Brand */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src="/assets/generated/upadhyay-lawz-logo-transparent.dim_200x200.png"
                      alt="Upadhyay Lawz & Consultant"
                      className="h-12 w-auto object-contain"
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
                    <li className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-cream/55 text-sm">
                        Chamber No. 44, Western Wing, Tis Hazari District
                        Courts, Delhi
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      <div className="text-cream/55 text-sm">
                        <div>+91 96540 83085</div>
                        <div>+91 87505 05255</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-cream/55 text-sm break-all">
                        sachinupadhayay146@gmail.com
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-cream/55 text-sm">
                        Mon–Sat: 9:30 AM – 6:00 PM
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-cream/45 text-xs text-center sm:text-left">
                  © {currentYear} Upadhyay Lawz &amp; Consultant | Adv. Sachin
                  Upadhyay. All rights reserved.
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
