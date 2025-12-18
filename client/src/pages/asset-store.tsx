import { useState } from "react";
import { Link } from "wouter";
import { Footer } from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import type { Asset } from "@shared/schema";

export default function AssetStore() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const { data: assetsData, isLoading } = useQuery<{ assets: Asset[] }>({
    queryKey: ["/api/assets"],
    queryFn: async () => {
      const res = await fetch("/api/assets");
      if (!res.ok) throw new Error("Failed to fetch assets");
      return res.json();
    },
  });

  const assets = assetsData?.assets || [];
  const uniqueCategories = Array.from(new Set(assets.map(a => a.category.toUpperCase())));
  const categories = ["ALL", ...uniqueCategories];
  
  const filteredAssets = selectedCategory === "ALL" 
    ? assets 
    : assets.filter(a => a.category.toUpperCase() === selectedCategory);

  const getAccentColor = (color: string) => {
    const colorMap: Record<string, string> = {
      neonPurple: "neonPurple",
      electricBlue: "electricBlue",
      signalOrange: "signalOrange",
      purple: "purple-500",
      green: "green-500",
      white: "white",
    };
    return colorMap[color] || "purple-500";
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-neonPurple selection:text-white overflow-x-hidden">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-b-glassBorder">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-header font-bold text-xl tracking-widest text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-electricBlue text-2xl">∞</span> INFINITE STUDIO
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-xs font-mono text-gray-400 hover:text-white transition-colors">HOME</Link>
            <a href="#" className="hidden md:block bg-neonPurple text-white px-6 py-2 text-xs font-header font-bold uppercase hover:bg-white hover:text-black transition-all duration-300 tracking-wider">
              All Access Pass
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative pt-40 pb-12 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-block border border-neonPurple/50 px-3 py-1 mb-6 text-[10px] font-mono text-neonPurple tracking-widest uppercase">
          Official Studio Assets
        </div>
        <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          THE INGREDIENT<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-blue-500">LIBRARY</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
          Production-ready assets for Veo 3.1 & Nano Banana. High-fidelity character sheets, textures, and sound profiles pre-optimized for AI ingestion.
        </p>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-6 py-2 rounded-full text-xs font-header font-bold transition-all ${
                selectedCategory === category
                  ? "bg-white text-black border-white"
                  : "border border-white/20 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* STORE GRID */}
      <section className="py-12 bg-black/50 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAssets.map((asset) => {
                const accentColor = getAccentColor(asset.color);
                return (
                  <div 
                    key={asset.id}
                    className={`glass-panel p-0 group cursor-pointer hover:border-${accentColor}/50 transition-all duration-300 overflow-hidden`}
                    data-testid={`asset-${asset.id}`}
                  >
                    <div className="aspect-[16/9] bg-gray-800 relative overflow-hidden">
                      {asset.imageUrl ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                          style={{ backgroundImage: `url('${asset.imageUrl}')` }}
                        ></div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                          <div className="font-mono text-xs text-green-500 opacity-70 p-8 leading-relaxed">
                            &gt; PROMPT: Cinematic wide...<br />
                            &gt; LENS: 35mm Anamorphic...<br />
                            &gt; LIGHT: Volumetric Fog...
                          </div>
                        </div>
                      )}
                      {asset.badge && (
                        <div className={`absolute top-4 left-4 bg-${accentColor} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}>
                          {asset.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-header text-lg text-white group-hover:text-${accentColor} transition-colors`}>{asset.title}</h3>
                        <span className="font-mono text-white">${parseFloat(asset.price).toFixed(0)}</span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono mb-4 border-b border-white/10 pb-4 line-clamp-2">{asset.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-500 font-header">{asset.fileFormat}</span>
                        <button className={`text-xs font-bold text-white hover:text-${accentColor} transition-colors flex items-center gap-1`}>
                          ADD TO CART <span>+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
