import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";
import { Play, X } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "ECHO PROTOCOL",
    category: "Sci-Fi Short Film",
    categoryTag: "SCI-FI",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    description: "A cyberpunk detective navigates the neon-soaked streets of Neo Tokyo, hunting for answers in a world where memories can be stolen.",
    duration: "2:34",
    year: "2025",
    accentColor: "electricBlue",
    featured: true,
  },
  {
    id: 2,
    title: "AURUM DYNAMICS",
    category: "Luxury Brand Commercial",
    categoryTag: "COMMERCIAL",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop",
    description: "A mesmerizing visual journey through liquid gold and obsidian, crafted for a luxury jewelry brand's global campaign.",
    duration: "1:45",
    year: "2025",
    accentColor: "signalOrange",
    featured: true,
  },
  {
    id: 3,
    title: "NEURAL BLOOM",
    category: "Experimental Art Film",
    categoryTag: "EXPERIMENTAL",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    description: "An abstract exploration of consciousness, where neural networks blossom into organic patterns of light and color.",
    duration: "3:12",
    year: "2024",
    accentColor: "purple-500",
    featured: false,
  },
  {
    id: 4,
    title: "CHROME REQUIEM",
    category: "Music Video",
    categoryTag: "MUSIC",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
    description: "A haunting visual accompaniment featuring a cybernetic dancer in an abandoned industrial cathedral.",
    duration: "4:20",
    year: "2024",
    accentColor: "electricBlue",
    featured: false,
  },
  {
    id: 5,
    title: "TERRA MEMORIA",
    category: "Documentary",
    categoryTag: "DOCUMENTARY",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    description: "A time-bending documentary exploring how ancient civilizations might have envisioned our technological future.",
    duration: "8:45",
    year: "2024",
    accentColor: "signalOrange",
    featured: false,
  },
  {
    id: 6,
    title: "PHANTOM SIGNAL",
    category: "Sci-Fi Short Film",
    categoryTag: "SCI-FI",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2672&auto=format&fit=crop",
    description: "A lone astronaut receives a mysterious transmission that challenges everything she knows about humanity's place in the cosmos.",
    duration: "5:30",
    year: "2025",
    accentColor: "electricBlue",
    featured: false,
  },
];

const categories = ["ALL", "SCI-FI", "COMMERCIAL", "EXPERIMENTAL", "MUSIC", "DOCUMENTARY"];

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const filteredStudies = activeCategory === "ALL" 
    ? caseStudies 
    : caseStudies.filter(study => study.categoryTag === activeCategory);

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
      
      <Navbar />

      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <p className="text-electricBlue font-mono text-xs mb-2 tracking-widest">/// PRODUCTION ARCHIVE</p>
          <h1 className="font-header text-4xl md:text-5xl font-bold text-white mb-4">OUR WORK</h1>
          <p className="text-gray-400 max-w-2xl">
            Watch the films we've created using AI filmmaking tools. Ready to create your own? 
            Enroll in the Academy to learn how.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              data-testid={`filter-${category.toLowerCase()}`}
              className={`px-4 py-2 text-xs font-header font-bold tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? "bg-electricBlue text-white"
                  : "border border-white/20 text-gray-400 hover:border-electricBlue hover:text-electricBlue"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              data-testid={`case-study-${study.id}`}
              className={`group relative glass-panel overflow-hidden border border-white/5 hover:border-${study.accentColor}/50 transition-all duration-500 ${
                study.featured ? "md:col-span-2 h-[500px]" : "h-[400px]"
              }`}
            >
              <div className="absolute inset-0 bg-gray-800">
                <div 
                  className="w-full h-full bg-cover bg-center opacity-70 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                  style={{ backgroundImage: `url('${study.image}')` }}
                ></div>
              </div>

              <button
                onClick={() => setPlayingVideo(study.id)}
                data-testid={`play-${study.id}`}
                className="absolute inset-0 flex items-center justify-center z-20"
              >
                <div className={`w-20 h-20 rounded-full bg-${study.accentColor}/20 backdrop-blur-sm flex items-center justify-center border border-${study.accentColor}/50 group-hover:bg-${study.accentColor} group-hover:scale-110 transition-all duration-300 cursor-pointer`}>
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </button>

              <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
                <span className={`bg-black/50 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 border border-white/20`}>
                  {study.duration}
                </span>
                <span className={`bg-black/50 backdrop-blur-sm text-gray-400 text-[10px] font-mono px-2 py-1 border border-white/20`}>
                  {study.year}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <span className={`bg-${study.accentColor}/20 text-${study.accentColor} text-[10px] font-mono px-2 py-1 border border-${study.accentColor}/30`}>
                  {study.categoryTag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className={`font-header text-2xl md:text-4xl text-white mb-2 group-hover:text-${study.accentColor} transition-colors duration-300`}>
                  {study.title}
                </h3>
                <p className="text-sm text-gray-400 font-mono tracking-wide border-l border-white/30 pl-3 mb-3">{study.category}</p>
                <p className="text-sm text-gray-500 max-w-xl leading-relaxed hidden md:block">{study.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="glass-panel p-12 text-center">
          <p className="text-signalOrange font-mono text-xs mb-4 tracking-widest">/// LEARN THE CRAFT</p>
          <h2 className="font-header text-3xl md:text-4xl font-bold text-white mb-6">
            WANT TO CREATE FILMS LIKE THESE?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Our courses teach you the complete workflow — from concept to final render. 
            Learn how to direct AI, not just prompt it.
          </p>
          <Link 
            href="/#academy"
            data-testid="link-academy"
            className="inline-block bg-electricBlue text-white font-header font-bold text-sm uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 tracking-wider"
          >
            Explore The Academy
          </Link>
        </div>
      </section>

      {playingVideo && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setPlayingVideo(null)}
        >
          <button 
            onClick={() => setPlayingVideo(null)}
            data-testid="close-video"
            className="absolute top-6 right-6 text-white hover:text-electricBlue transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-gray-900 flex items-center justify-center border border-white/10">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-electricBlue/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Play className="w-6 h-6 text-electricBlue" />
              </div>
              <p className="text-gray-400 font-mono text-sm">Video Player</p>
              <p className="text-gray-600 font-mono text-xs mt-2">
                {caseStudies.find(s => s.id === playingVideo)?.title}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
