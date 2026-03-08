import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Gavel,
  HeartHandshake,
  Landmark,
  Scale,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

/* ── Reusable fade-in wrapper ── */
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
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

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

/* ── Associate data ── */
const ASSOCIATES = [
  {
    id: "associates.item.1",
    name: "Adv. Ravi Shrivastava",
    initials: "RS",
    specialization: "Criminal Law",
    specialIcon: Gavel,
    bio: "Adv. Ravi Shrivastava brings sharp criminal law acumen honed across the corridors of the Delhi High Court and every district court complex the capital has to offer. From Tis Hazari to Karkardooma, Rohini to Saket, no jurisdiction in Delhi — or beyond — is unfamiliar terrain. His practice spans bail applications, trial advocacy, and appeals with a track record that speaks across India's legal landscape.",
    credentials: [
      "Bar Council of Delhi",
      "Delhi High Court",
      "All District Courts, Delhi",
      "Criminal Defense & Prosecution",
    ],
  },
  {
    id: "associates.item.2",
    name: "Adv. Neetu Rawat",
    initials: "NR",
    specialization: "Family Law",
    specialIcon: HeartHandshake,
    bio: "Adv. Neetu Rawat is a seasoned family law practitioner whose expertise spans matrimonial disputes, child custody, maintenance, and succession matters before the Delhi High Court and the full breadth of Delhi's district court network. With a practice that recognises no geographical boundary, she has guided families from Tis Hazari to courtrooms far beyond Delhi — wherever justice needs a firm yet empathetic hand.",
    credentials: [
      "Bar Council of Delhi",
      "Delhi High Court",
      "All District Courts, Delhi",
      "Family & Matrimonial Law",
    ],
  },
] as const;

/* ══════════════════════════════════
   ASSOCIATES PAGE COMPONENT
══════════════════════════════════ */
export default function AssociatesPage({ onBack }: { onBack: () => void }) {
  return (
    <div
      data-ocid="associates.page"
      className="min-h-screen font-body bg-background"
    >
      {/* ─────────── HERO STRIP ─────────── */}
      <section className="bg-crimson-deep pt-24 sm:pt-28 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, oklch(0.85 0.18 85 / 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.85 0.18 85 / 0.1) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Gold line accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <motion.button
            type="button"
            data-ocid="associates.back.button"
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-flex items-center gap-2 text-cream/70 hover:text-gold transition-colors duration-200 mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-display tracking-wide">
              Back to Main
            </span>
          </motion.button>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <Scale className="h-3.5 w-3.5" />
              <span>Upadhyay Lawz & Consultant</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-cream mb-4 leading-tight">
              Our Associates
            </h1>

            {/* Gold underline */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-gold/20 via-gold to-gold/20 mx-auto mb-6" />

            <p className="text-cream/65 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              A distinguished panel of legal professionals who collectively
              command Delhi's entire court ecosystem — and carry that authority
              wherever in India their clients may need them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────── ASSOCIATE CARDS ─────────── */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {ASSOCIATES.map((associate, i) => (
              <FadeIn key={associate.id} delay={i * 0.12}>
                <div
                  data-ocid={associate.id}
                  className="group relative bg-card border border-border hover:border-gold/50 rounded-sm shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Gold accent left bar */}
                  <div className="absolute top-0 left-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500 rounded-tl-sm" />

                  {/* Card content */}
                  <div className="p-5 sm:p-7 flex flex-col flex-1">
                    {/* Avatar + name header */}
                    <div className="flex items-start gap-4 mb-6">
                      {/* Avatar circle with initials */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-crimson-deep border-2 border-gold/30 flex items-center justify-center shadow-crimson group-hover:border-gold/60 transition-colors duration-300">
                          <span className="font-display text-xl font-bold text-gold">
                            {associate.initials}
                          </span>
                        </div>
                        {/* Specialization icon badge */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow-sm">
                          <associate.specialIcon className="h-3 w-3 text-crimson-deep" />
                        </div>
                      </div>

                      {/* Name + specialization */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-display text-xl font-bold text-foreground leading-tight mb-2">
                          {associate.name}
                        </h2>
                        <Badge
                          className="bg-crimson-deep/10 text-crimson-deep border border-crimson-deep/25 text-[10px] font-semibold tracking-wider uppercase hover:bg-crimson-deep/15 transition-colors"
                          variant="outline"
                        >
                          {associate.specialization}
                        </Badge>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-border mb-5" />

                    {/* Bio */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      {associate.bio}
                    </p>

                    {/* Credentials */}
                    <div className="bg-secondary/60 rounded-sm p-4 border border-border/50">
                      <div className="text-gold text-[10px] font-semibold tracking-widest uppercase mb-3 flex items-center gap-1.5">
                        <Award className="h-3 w-3" />
                        <span>Credentials & Jurisdictions</span>
                      </div>
                      <ul className="space-y-2">
                        {associate.credentials.map((cred) => (
                          <li
                            key={cred}
                            className="flex items-center gap-2 text-xs text-foreground"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                            <span>{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* ─── Pan-India Practice Note ─── */}
          <FadeIn delay={0.25} className="mt-12">
            <div className="bg-crimson-deep/5 border border-gold/20 rounded-sm p-7 text-center">
              <div className="w-12 h-12 rounded-full bg-crimson-deep mx-auto flex items-center justify-center mb-4 shadow-crimson">
                <Landmark className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Collective Pan-India Reach
              </h3>
              <div className="w-12 h-0.5 bg-gold mx-auto mb-4" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
                Together, the associates of Upadhyay Lawz & Consultant cover the
                Supreme Court of India, the Delhi High Court, all five district
                court complexes in Delhi, and through their collective practice
                network, extend effective legal representation to any court
                across the length and breadth of India.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─────────── FOOTER STRIP ─────────── */}
      <div className="bg-crimson-deep/5 border-t border-border py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Part of{" "}
            <span className="text-foreground font-display font-semibold">
              Upadhyay Lawz & Consultant
            </span>{" "}
            — Chamber No. 44, Western Wing, Tis Hazari District Courts, Delhi
            110054
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            © {new Date().getFullYear()} Upadhyay Lawz & Consultant. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
