import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api";

const projects = [
  {
    id: 1,
    title: "ECHO PROTOCOL",
    category: "Sci-Fi Short Film",
    description: "A cyberpunk detective navigates neon-soaked streets, hunting for answers in a world where memories can be stolen.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    duration: "2:34",
    year: "2025",
    accentColor: "electricBlue",
  },
  {
    id: 2,
    title: "AURUM DYNAMICS",
    category: "Luxury Brand Commercial",
    description: "A mesmerizing visual journey through liquid gold and obsidian, crafted for a luxury jewelry brand's global campaign.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop",
    duration: "1:45",
    year: "2025",
    accentColor: "signalOrange",
  },
  {
    id: 3,
    title: "NEURAL BLOOM",
    category: "Experimental Art Film",
    description: "An abstract exploration of consciousness, where neural networks blossom into organic patterns of light and color.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    duration: "3:12",
    year: "2024",
    accentColor: "purple-500",
  },
  {
    id: 4,
    title: "PHANTOM SIGNAL",
    category: "Sci-Fi Short Film",
    description: "A lone astronaut receives a mysterious transmission that challenges everything she knows about humanity's place in the cosmos.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2672&auto=format&fit=crop",
    duration: "5:30",
    year: "2025",
    accentColor: "electricBlue",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: coursesData } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
  const featuredCourses = (coursesData?.data?.courses || []).slice(0, 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
      <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-electricBlue selection:text-white overflow-x-hidden">
          {/* GRID BACKGROUND OVERLAY */}
          <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
          <Navbar />
          {/* HERO SECTION: THE DASHBOARD */}
          <header className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10">
              {/* BENTO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                  
                  {/* MAIN SHOWREEL (Top Left - 60%) */}
                  <div className="md:col-span-8 glass-panel relative overflow-hidden group h-[400px] md:h-full border border-white/10 hover:border-electricBlue/30 transition-colors duration-500">
                      {/* Placeholder for Video */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                          {/* Simulating a video loop */}
                          <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                              <div className="text-6xl mb-4 text-electricBlue animate-pulse">▶</div>
                              <p className="font-header tracking-widest text-xs md:text-sm">SHOWREEL_2025.MP4</p>
                          </div>
                          {/* Decorative UI elements mimicking software */}
                          <div className="absolute top-4 left-4 text-[10px] font-mono text-electricBlue flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div> REC ● [00:01:24:12]
                          </div>
                          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white opacity-50">VEO 3.1 RENDER</div>
                          <div className="absolute inset-0 border border-white/5 m-4 pointer-events-none"></div>
                          
                           {/* Scanlines Overlay */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
                      </div>
                      
                      {/* Overlay Text */}
                      <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
                          <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight glitch-hover cursor-default drop-shadow-lg">
                              DIRECT THE<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-purple-600">ALGORITHM</span>
                          </h1>
                      </div>
                  </div>

                  {/* ACADEMY CTA (Top Right - 40%) */}
                  <div className="md:col-span-4 flex flex-col gap-6 h-full">
                      <div className="glass-panel flex-1 p-8 flex flex-col justify-center relative overflow-hidden hover:border-signalOrange/50 transition-colors duration-300 group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-header font-bold text-white group-hover:text-signalOrange transition-colors duration-300">01</div>
                          
                          <div className="relative z-10">
                              <h2 className="font-header text-2xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">THE ACADEMY</h2>
                              <p className="text-sm text-gray-400 mb-6 leading-relaxed">Stop prompting blindly. Master the Google Filmmaking Ecosystem from Gemini to Veo.</p>
                              <button
                                onClick={() => document.getElementById("academy")?.scrollIntoView({ behavior: "smooth" })}
                                className="inline-block bg-signalOrange text-black px-6 py-3 font-header text-xs font-bold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300"
                                data-testid="btn-view-courses-hero"
                              >
                                  View Courses
                              </button>
                          </div>
                      </div>

                      <div className="glass-panel flex-1 p-8 flex flex-col justify-center relative hover:border-electricBlue/50 transition-colors duration-300 group cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-header font-bold text-white group-hover:text-electricBlue transition-colors duration-300">02</div>
                          
                          <div className="relative z-10">
                              <h2 className="font-header text-2xl text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">STUDIO SERVICES</h2>
                              <p className="text-sm text-gray-400 mb-6 leading-relaxed">Full-service AI production. Commercials, music videos, and pre-viz.</p>
                              <Link href="/hire" className="inline-block border border-white/30 text-white px-6 py-3 font-header text-xs font-bold uppercase tracking-wider hover:border-electricBlue hover:text-electricBlue hover:scale-105 transition-all duration-300">
                                  Hire Us
                              </Link>
                          </div>
                      </div>
                  </div>

              </div>

              {/* TRUST STRIP */}
              <div className="mt-12 border-t border-white/10 pt-6 flex flex-wrap gap-8 md:gap-16 justify-center md:justify-start items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                  <span className="text-[10px] font-mono tracking-widest text-gray-500">TECHNIQUES USED BY CREATORS AT:</span>
                  {/* Fake Logos for Mockup */}
                  <div className="font-header font-bold text-lg hover:text-white transition-colors">GEMINI</div>
                  <div className="font-header font-bold text-lg hover:text-white transition-colors">NANO BANANA</div>
                  <div className="font-header font-bold text-lg hover:text-white transition-colors">VEO</div>
                  <div className="font-header font-bold text-lg hover:text-white transition-colors">FLOW</div>
              </div>
          </header>
          {/* WORK SECTION */}
          <section id="work" className="py-20 border-t border-white/10 bg-black/50 relative z-10">
              <div className="max-w-7xl mx-auto px-6">
                  <div className="flex justify-between items-end mb-12">
                      <div>
                          <p className="text-electricBlue font-mono text-xs mb-2 tracking-widest">/// SELECTED WORKS</p>
                          <h2 className="font-header text-4xl font-bold text-white">PRODUCTION</h2>
                      </div>
                  </div>

                  {/* Project Carousel */}
                  <div className="relative">
                      {/* Left Arrow */}
                      <button
                        onClick={prevSlide}
                        data-testid="carousel-prev"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 glass-panel flex items-center justify-center border border-white/20 hover:border-electricBlue hover:bg-electricBlue/20 transition-all duration-300 -translate-x-1/2 md:-translate-x-6"
                      >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </button>

                      {/* Right Arrow */}
                      <button
                        onClick={nextSlide}
                        data-testid="carousel-next"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 glass-panel flex items-center justify-center border border-white/20 hover:border-electricBlue hover:bg-electricBlue/20 transition-all duration-300 translate-x-1/2 md:translate-x-6"
                      >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </button>

                      {/* Carousel Container */}
                      <div className="overflow-hidden">
                        <div 
                          className="flex transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                          {projects.map((project) => (
                            <div 
                              key={project.id}
                              className="group relative h-[450px] w-full flex-shrink-0 glass-panel overflow-hidden border border-white/5 hover:border-electricBlue/50 transition-all duration-500"
                            >
                              <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700">
                                <div 
                                  className="w-full h-full bg-cover bg-center opacity-70 group-hover:opacity-50 transition-opacity duration-500"
                                  style={{ backgroundImage: `url('${project.image}')` }}
                                ></div>
                              </div>
                              
                              <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className={`w-20 h-20 rounded-full bg-${project.accentColor}/20 backdrop-blur-sm flex items-center justify-center border border-${project.accentColor}/50 group-hover:bg-${project.accentColor} group-hover:scale-110 transition-all duration-300`}>
                                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                </div>
                              </div>

                              <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
                                <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 border border-white/20">{project.duration}</span>
                                <span className="bg-black/50 backdrop-blur-sm text-gray-400 text-[10px] font-mono px-2 py-1 border border-white/20">{project.year}</span>
                              </div>

                              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                                <h3 className={`font-header text-3xl md:text-5xl text-white mb-2 group-hover:text-${project.accentColor} transition-colors duration-300`}>{project.title}</h3>
                                <p className="text-sm text-gray-400 font-mono tracking-wide border-l border-white/30 pl-3 mb-3">{project.category}</p>
                                <p className="text-sm text-gray-500 max-w-xl leading-relaxed hidden md:block">{project.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Slide Indicators */}
                      <div className="flex justify-center gap-2 mt-6">
                        {projects.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            data-testid={`slide-indicator-${index}`}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentSlide 
                                ? "bg-electricBlue w-8" 
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                  </div>
              </div>
          </section>
          {/* ACADEMY SECTION */}
          <section id="academy" className="py-20 max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex justify-between items-end mb-12">
                  <div>
                      <p className="text-signalOrange font-mono text-xs mb-2 tracking-widest">/// KNOWLEDGE TRANSFER</p>
                      <h2 className="font-header text-4xl font-bold text-white">ACADEMY</h2>
                  </div>
                  <Link href="/academy" className="text-xs font-header font-bold border-b border-signalOrange pb-1 hover:text-signalOrange transition-colors tracking-wider" data-testid="link-view-all-courses">ALL COURSES</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredCourses.length > 0 ? (
                    featuredCourses.map((course: any) => {
                      const isBlue = course.color === 'electricBlue';
                      const tier = course.level === 'Foundation' ? 'foundation' : 'specialist';
                      return (
                        <Link
                          key={course.id}
                          href={`/academy/${tier}/${course.slug}`}
                          className={`glass-panel p-0 hover:border-${isBlue ? 'electricBlue' : 'signalOrange'}/50 transition-all duration-300 group cursor-pointer block`}
                          data-testid={`card-course-home-${course.slug}`}
                        >
                            <div className="h-48 bg-gray-900 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${isBlue ? 'from-blue-900/40' : 'from-orange-900/40'} to-black`}></div>
                                {course.badge && (
                                  <div className={`absolute top-4 right-4 ${isBlue ? 'bg-electricBlue text-white' : 'bg-signalOrange text-black'} text-[10px] font-bold px-2 py-1`}>{course.badge}</div>
                                )}
                            </div>
                            <div className="p-8">
                                <h3 className={`font-header text-xl text-white mb-2 group-hover:text-${isBlue ? 'electricBlue' : 'signalOrange'} transition-colors leading-tight`}>{course.title}</h3>
                                <p className="text-xs text-gray-400 font-mono mb-4 leading-relaxed">{course.shortDescription}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                    <span className="text-xs font-mono text-white">{course.duration} • {course.lessonsCount} LESSONS</span>
                                    <span className="text-sm font-header font-bold text-white">${parseFloat(course.price).toFixed(0)}</span>
                                </div>
                            </div>
                        </Link>
                      );
                    })
                  ) : (
                    <>
                      <div className="glass-panel p-0 animate-pulse h-96"></div>
                      <div className="glass-panel p-0 animate-pulse h-96"></div>
                    </>
                  )}
              </div>
          </section>
          {/* ASSET STORE & FOOTER CONTAINER */}
          <div className="bg-black border-t border-white/10 relative z-20">
              
              {/* ASSET STORE (Added Here) */}
              <div id="store" className="max-w-7xl mx-auto px-6 py-16 border-b border-white/10">
                  <div className="flex justify-between items-end mb-12">
                      <div>
                          <p className="text-purple-500 font-mono text-xs mb-2 tracking-widest">/// RESOURCE LIBRARY</p>
                          <h2 className="font-header text-4xl font-bold text-white">STORE</h2>
                      </div>
                      <Link href="/store" className="text-xs font-header font-bold border-b border-purple-500 pb-1 hover:text-purple-500 transition-colors tracking-wider" data-testid="link-view-all-packs">ALL ASSETS</Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Asset 1 */}
                      <div className="glass-panel p-6 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                          <div className="aspect-video bg-gray-800 mb-4 overflow-hidden relative">
                               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                               <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1">NEW</div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-1">CYBERPUNK TEXTURES VOL. 1</h3>
                          <p className="text-xs text-gray-500 font-mono mb-4">50+ Nano Banana Generated Surfaces</p>
                          <div className="flex justify-between items-center">
                              <span className="text-white font-bold">$29</span>
                              <span className="text-[10px] text-purple-400 group-hover:translate-x-1 transition-transform">GET PACK →</span>
                          </div>
                      </div>

                      {/* Asset 2 */}
                      <div className="glass-panel p-6 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                          <div className="aspect-video bg-gray-800 mb-4 overflow-hidden relative">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-1">SCI-FI CHARACTER SHEETS</h3>
                          <p className="text-xs text-gray-500 font-mono mb-4">Ready-to-use 'Ingredients' for Veo</p>
                          <div className="flex justify-between items-center">
                              <span className="text-white font-bold">$49</span>
                              <span className="text-[10px] text-purple-400 group-hover:translate-x-1 transition-transform">GET PACK →</span>
                          </div>
                      </div>

                      {/* Asset 3 */}
                      <div className="glass-panel p-6 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                          <div className="aspect-video bg-gray-800 mb-4 overflow-hidden relative">
                              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-500"></div>
                          </div>
                          <h3 className="font-header text-sm text-white mb-1">CINEMATIC LUTS PACK</h3>
                          <p className="text-xs text-gray-500 font-mono mb-4">Color grading for AI video output</p>
                          <div className="flex justify-between items-center">
                              <span className="text-white font-bold">$19</span>
                              <span className="text-[10px] text-purple-400 group-hover:translate-x-1 transition-transform">GET PACK →</span>
                          </div>
                      </div>
                  </div>
              </div>
              
          </div>
          <Footer />
      </div>
  );
}
