import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";
import { Clock, Users, Star, ArrowRight } from "lucide-react";

type Tier = "all" | "foundation" | "specialist" | "flagship";
type ColorKey = "blue" | "orange" | "purple" | "gold";

const COLOR_STYLES: Record<ColorKey, { hoverBorder: string; badgeBg: string; accentText: string; gradientFrom: string; durationPill: string; hoverText: string }> = {
  blue: {
    hoverBorder: "hover:border-electricBlue/50",
    badgeBg: "bg-electricBlue text-white",
    accentText: "text-electricBlue",
    gradientFrom: "from-blue-900/40",
    durationPill: "text-electricBlue bg-electricBlue/10",
    hoverText: "group-hover:text-electricBlue",
  },
  orange: {
    hoverBorder: "hover:border-signalOrange/50",
    badgeBg: "bg-signalOrange text-black",
    accentText: "text-signalOrange",
    gradientFrom: "from-orange-900/40",
    durationPill: "text-signalOrange bg-signalOrange/10",
    hoverText: "group-hover:text-signalOrange",
  },
  purple: {
    hoverBorder: "hover:border-purple-500/50",
    badgeBg: "bg-purple-500 text-white",
    accentText: "text-purple-400",
    gradientFrom: "from-purple-900/40",
    durationPill: "text-purple-400 bg-purple-500/10",
    hoverText: "group-hover:text-purple-400",
  },
  gold: {
    hoverBorder: "hover:border-gold/50",
    badgeBg: "bg-gold text-black",
    accentText: "text-gold",
    gradientFrom: "from-yellow-900/40",
    durationPill: "text-gold bg-gold/10",
    hoverText: "group-hover:text-gold",
  },
};

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tier: "foundation" | "specialist" | "flagship";
  price: string;
  duration: string;
  lessons: number;
  slug: string;
  colorKey: ColorKey;
  badge?: string;
  image: string;
  comingSoon?: boolean;
}

const courses: Course[] = [
  {
    id: "1",
    title: "THE AI CINEMATOGRAPHY HANDBOOK",
    subtitle: "Directing the Algorithm",
    description: "A technical course on translating real-world lighting, lenses, and camera angles into AI prompts. Learn to speak cinema to the machine.",
    tier: "foundation",
    price: "$97",
    duration: "3.5 HRS",
    lessons: 18,
    slug: "ai-cinematography-handbook",
    colorKey: "blue",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "NANO BANANA MASTERY",
    subtitle: "Consistent Character Generation",
    description: "A deep-dive into consistent character generation and style-locking. Master the tool that powers professional AI production pipelines.",
    tier: "foundation",
    price: "$49",
    duration: "2.0 HRS",
    lessons: 12,
    slug: "nano-banana-mastery",
    colorKey: "orange",
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "THE OBSIDIAN WORKFLOW",
    subtitle: "Post-Production Pipeline",
    description: "Take raw AI footage and polish it in DaVinci Resolve or Premiere Pro. Remove the 'AI look' and deliver professional-grade output.",
    tier: "foundation",
    price: "$147",
    duration: "4.5 HRS",
    lessons: 24,
    slug: "obsidian-workflow",
    colorKey: "purple",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "AI FASHION & COMMERCIALS",
    subtitle: "High-End Visual Production",
    description: "Create high-end, high-fashion aesthetic video for luxury brands. Targeted at directors working with visionary clients.",
    tier: "specialist",
    price: "$397",
    duration: "6.0 HRS",
    lessons: 32,
    slug: "ai-fashion-commercials",
    colorKey: "gold",
    badge: "PRO",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "THE 24-HOUR SHORT FILM",
    subtitle: "Weekend Intensive",
    description: "Go from a blank script to a 60-second cinematic film in one day using Veo 3.1. The ultimate speed-to-quality workflow.",
    tier: "specialist",
    price: "$297",
    duration: "8.0 HRS",
    lessons: 16,
    slug: "24-hour-short-film",
    colorKey: "orange",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "VFX FOR TRADITIONAL FILMMAKERS",
    subtitle: "AI-Enhanced Real-World Footage",
    description: "Add complex visual effects — liquid gold, abstract textures, impossible environments — to your real-world footage using AI tools.",
    tier: "specialist",
    price: "$497",
    duration: "7.0 HRS",
    lessons: 28,
    slug: "vfx-traditional-filmmakers",
    colorKey: "blue",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "INFINITE STUDIO MENTORSHIP",
    subtitle: "1-on-1 Coaching Program",
    description: "High-touch, personalized coaching to become a professional AI Director. Direct access to the Infinite Studio team and production pipeline.",
    tier: "flagship",
    price: "FROM $1,500",
    duration: "12 WEEKS",
    lessons: 0,
    slug: "mentorship",
    colorKey: "gold",
    badge: "FLAGSHIP",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop",
  },
];

export default function Academy() {
  const [activeTier, setActiveTier] = useState<Tier>("all");

  const filteredCourses = activeTier === "all" ? courses : courses.filter(c => c.tier === activeTier);

  const tiers: { key: Tier; label: string }[] = [
    { key: "all", label: "ALL COURSES" },
    { key: "foundation", label: "FOUNDATION" },
    { key: "specialist", label: "SPECIALIST" },
    { key: "flagship", label: "FLAGSHIP" },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-sans antialiased selection:bg-signalOrange selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
      <Navbar />

      <header className="relative pt-40 pb-12 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block border border-signalOrange/50 px-3 py-1 mb-6 text-[10px] font-mono text-signalOrange tracking-widest uppercase">
              The Curriculum
            </div>
            <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              DIRECT THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-signalOrange to-yellow-500">ALGORITHM</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed font-light mb-8">
              From your first prompt to your final render. A structured education path for the modern AI Filmmaker.
            </p>

            <div className="flex flex-wrap gap-3">
              {tiers.map((tier) => (
                <button
                  key={tier.key}
                  onClick={() => setActiveTier(tier.key)}
                  data-testid={`filter-${tier.key}`}
                  className={`border px-5 py-2 rounded-full text-xs font-header font-bold tracking-wider transition-all duration-300 ${
                    activeTier === tier.key
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-end relative">
            <div className="w-80 h-80 rounded-full border border-white/10 flex items-center justify-center relative">
              <div className="absolute w-64 h-64 rounded-full border border-electricBlue/30 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute w-48 h-48 rounded-full border border-signalOrange/30 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="font-header text-5xl text-white">∞</div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 bg-black/50 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">

          {(activeTier === "all" || activeTier === "foundation") && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-header text-xl text-white border-l-4 border-electricBlue pl-4">FOUNDATION</h2>
                <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">$49 – $147</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredCourses.filter(c => c.tier === "foundation").map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

          {(activeTier === "all" || activeTier === "specialist") && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-header text-xl text-white border-l-4 border-signalOrange pl-4">SPECIALIST</h2>
                <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">$297 – $497</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredCourses.filter(c => c.tier === "specialist").map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

          {(activeTier === "all" || activeTier === "flagship") && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-header text-xl text-white border-l-4 border-gold pl-4">FLAGSHIP</h2>
                <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">$1,500+</span>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {filteredCourses.filter(c => c.tier === "flagship").map((course) => (
                  <FlagshipCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const styles = COLOR_STYLES[course.colorKey];

  const inner = (
    <div className={`glass-panel p-1 group cursor-pointer ${styles.hoverBorder} transition-all duration-300 h-full flex flex-col`} data-testid={`card-course-${course.slug}`}>
      <div className="bg-gray-900 h-56 relative overflow-hidden flex-shrink-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradientFrom} to-black`}></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
          style={{ backgroundImage: `url('${course.image}')` }}
        ></div>
        {course.badge && (
          <div className={`absolute top-3 right-3 ${styles.badgeBg} text-[10px] font-bold px-2 py-1`}>
            {course.badge}
          </div>
        )}
        {course.comingSoon && (
          <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-400 border border-white/20 bg-black/50 px-2 py-1">COMING SOON</div>
        )}
      </div>
      <div className="px-6 pb-8 pt-6 flex flex-col flex-1">
        <h3 className={`font-header text-xl text-white mb-3 ${styles.hoverText} transition-colors leading-tight`}>{course.title}</h3>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-1">{course.description}</p>
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <span className={`font-mono text-xs ${styles.durationPill} px-2 py-1 rounded`}>{course.duration}</span>
          <span className={`font-header font-bold text-xl text-white ${styles.hoverText} transition-colors`} data-testid={`text-price-${course.slug}`}>{course.price}</span>
        </div>
      </div>
    </div>
  );

  if (course.comingSoon) return inner;

  return (
    <Link href={course.slug === "mentorship" ? "/mentorship" : `/course/${course.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}

function FlagshipCard({ course }: { course: Course }) {
  return (
    <Link href="/mentorship" className="block">
      <div className="glass-panel p-0 group cursor-pointer hover:border-gold/50 transition-all duration-300 overflow-hidden" data-testid={`card-course-${course.slug}`}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/40 to-black"></div>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
              style={{ backgroundImage: `url('${course.image}')` }}
            ></div>
            <div className="absolute top-4 left-4 bg-gold text-black text-[10px] font-bold px-3 py-1">FLAGSHIP</div>
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gold" fill="currentColor" />
                <Star className="w-4 h-4 text-gold" fill="currentColor" />
                <Star className="w-4 h-4 text-gold" fill="currentColor" />
                <Star className="w-4 h-4 text-gold" fill="currentColor" />
                <Star className="w-4 h-4 text-gold" fill="currentColor" />
              </div>
            </div>
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <p className="text-[10px] font-mono text-gold mb-3 tracking-widest uppercase">{course.subtitle}</p>
            <h3 className="font-header text-2xl text-white mb-4 leading-tight group-hover:text-gold transition-colors">{course.title}</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Clock className="w-4 h-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Users className="w-4 h-4" /> 1-ON-1 + GROUP
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xl font-header font-bold text-gold" data-testid={`text-price-${course.slug}`}>{course.price}</span>
              <span className="flex items-center gap-2 text-xs font-header text-white group-hover:text-gold transition-colors">
                LEARN MORE <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
