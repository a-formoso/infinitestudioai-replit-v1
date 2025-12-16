import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

const caseStudies = [
  {
    id: 1,
    title: "ECHO PROTOCOL",
    category: "Sci-Fi Short Film",
    categoryTag: "SCI-FI",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    prompt: "Cinematic wide shot of a cyberpunk detective standing in neon rain, 35mm anamorphic lens, Blade Runner 2049 aesthetic, high contrast, volumetric fog...",
    tools: ["GEMINI 3.0", "NANO BANANO", "VEO 3.1"],
    duration: "2:34",
    accentColor: "electricBlue",
    featured: true,
  },
  {
    id: 2,
    title: "AURUM DYNAMICS",
    category: "Luxury Brand Commercial",
    categoryTag: "COMMERCIAL",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop",
    prompt: "Macro photography of liquid gold merging with obsidian rock, fluid dynamics simulation, 8k resolution, luxury commercial lighting...",
    tools: ["VEO 3.1 PHYSICS", "MUSIC FX"],
    duration: "1:45",
    accentColor: "signalOrange",
    featured: true,
  },
  {
    id: 3,
    title: "NEURAL BLOOM",
    category: "Experimental Art Film",
    categoryTag: "EXPERIMENTAL",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    prompt: "Abstract visualization of neural networks forming flower patterns, bioluminescent colors, macro lens, organic growth animation, ethereal atmosphere...",
    tools: ["GEMINI 3.0", "VEO 3.1"],
    duration: "3:12",
    accentColor: "purple-500",
    featured: false,
  },
  {
    id: 4,
    title: "CHROME REQUIEM",
    category: "Music Video",
    categoryTag: "MUSIC",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
    prompt: "Cybernetic dancer in chrome armor, reflective surfaces, dramatic spotlights, slow motion movement, industrial warehouse setting, music video aesthetic...",
    tools: ["VEO 3.1", "MUSIC FX", "NANO BANANO"],
    duration: "4:20",
    accentColor: "electricBlue",
    featured: false,
  },
  {
    id: 5,
    title: "TERRA MEMORIA",
    category: "Documentary",
    categoryTag: "DOCUMENTARY",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    prompt: "Aerial view of ancient ruins merging with futuristic architecture, time-lapse effect, golden hour lighting, documentary style narration pacing...",
    tools: ["GEMINI 3.0", "VEO 3.1"],
    duration: "8:45",
    accentColor: "signalOrange",
    featured: false,
  },
  {
    id: 6,
    title: "PHANTOM SIGNAL",
    category: "Sci-Fi Short Film",
    categoryTag: "SCI-FI",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2672&auto=format&fit=crop",
    prompt: "Lone astronaut receiving mysterious transmission on desolate moon base, lens flare, isolation cinematography, 2001 Space Odyssey influence...",
    tools: ["GEMINI 3.0", "VEO 3.1", "MUSIC FX"],
    duration: "5:30",
    accentColor: "electricBlue",
    featured: false,
  },
];

const categories = ["ALL", "SCI-FI", "COMMERCIAL", "EXPERIMENTAL", "MUSIC", "DOCUMENTARY"];

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("ALL");

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
          <h1 className="font-header text-4xl md:text-5xl font-bold text-white mb-4">CASE STUDIES</h1>
          <p className="text-gray-400 max-w-2xl">
            Explore the creative process behind our AI-generated films. Each project reveals the prompts, 
            tools, and techniques used to bring these visions to life.
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
              className={`group relative glass-panel overflow-hidden cursor-pointer border border-white/5 hover:border-${study.accentColor}/50 transition-all duration-500 ${
                study.featured ? "md:col-span-2 h-[500px]" : "h-[400px]"
              }`}
            >
              <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700">
                <div 
                  className="w-full h-full bg-cover bg-center opacity-70 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundImage: `url('${study.image}')` }}
                ></div>
              </div>
              
              <div className="absolute inset-0 bg-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center p-8 md:p-12">
                <p className={`text-${study.accentColor} font-mono text-xs mb-4 tracking-widest`}>/// PROMPT DATA REVEALED</p>
                <p className="font-mono text-sm md:text-lg text-gray-300 mb-6 border-l-2 border-signalOrange pl-6 leading-relaxed italic">
                  "{study.prompt}"
                </p>
                <div className="flex flex-wrap gap-3 text-[10px] md:text-xs font-header text-white/70 mb-6">
                  {study.tools.map((tool) => (
                    <span 
                      key={tool}
                      className={`border border-white/20 px-3 py-1 rounded-full hover:bg-${study.accentColor}/20 hover:border-${study.accentColor} transition-colors`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-gray-500">DURATION: {study.duration}</span>
                  <span className={`text-xs font-header text-${study.accentColor} hover:underline`}>
                    VIEW FULL BREAKDOWN →
                  </span>
                </div>
              </div>

              <div className="absolute top-4 right-4 z-10">
                <span className={`bg-${study.accentColor}/20 text-${study.accentColor} text-[10px] font-mono px-2 py-1 border border-${study.accentColor}/30`}>
                  {study.categoryTag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
                <h3 className={`font-header text-2xl md:text-4xl text-white mb-2 group-hover:text-${study.accentColor} transition-colors duration-300`}>
                  {study.title}
                </h3>
                <p className="text-sm text-gray-400 font-mono tracking-wide border-l border-white/30 pl-3">{study.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="glass-panel p-12 text-center">
          <p className="text-signalOrange font-mono text-xs mb-4 tracking-widest">/// START YOUR JOURNEY</p>
          <h2 className="font-header text-3xl md:text-4xl font-bold text-white mb-6">
            READY TO CREATE YOUR OWN?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Learn the exact techniques used to create these case studies. Our courses teach you how to 
            direct AI, not just prompt it.
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

      <Footer />
    </div>
  );
}
