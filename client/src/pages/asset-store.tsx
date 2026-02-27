import { useState } from "react";
import { Link } from "wouter";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "@/lib/api";

export default function AssetStore() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const { data: assetsData, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
  });

  const allAssets = assetsData?.data?.assets || [];
  const publishedAssets = allAssets.filter((a: any) => a.status === "published");
  const categories = Array.from(new Set(publishedAssets.map((a: any) => a.category).filter(Boolean)));
  const filteredAssets = selectedCategory === "ALL"
    ? publishedAssets
    : publishedAssets.filter((a: any) => a.category === selectedCategory);

  const getAccentColor = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "neonPurple",
      electricBlue: "electricBlue",
      signalOrange: "signalOrange",
      white: "white",
    };
    return map[color] || "neonPurple";
  };

  const getHoverBorderClass = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "hover:border-neonPurple/50",
      electricBlue: "hover:border-electricBlue/50",
      signalOrange: "hover:border-signalOrange/50",
      white: "hover:border-white/50",
    };
    return map[color] || "hover:border-neonPurple/50";
  };

  const getHoverTextClass = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "group-hover:text-neonPurple",
      electricBlue: "group-hover:text-electricBlue",
      signalOrange: "group-hover:text-signalOrange",
      white: "group-hover:text-gray-300",
    };
    return map[color] || "group-hover:text-neonPurple";
  };

  const getBadgeBgClass = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "bg-neonPurple",
      electricBlue: "bg-electricBlue",
      signalOrange: "bg-signalOrange",
      white: "bg-white text-black",
    };
    return map[color] || "bg-neonPurple";
  };

  const getButtonHoverClass = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "hover:text-neonPurple",
      electricBlue: "hover:text-electricBlue",
      signalOrange: "hover:text-signalOrange",
      white: "hover:text-gray-300",
    };
    return map[color] || "hover:text-neonPurple";
  };

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-neonPurple selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      <header className="relative pt-40 pb-12 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-block border border-neonPurple/50 px-3 py-1 mb-6 text-[10px] font-mono text-neonPurple tracking-widest uppercase">
          Official Studio Assets
        </div>
        <h1 className="font-header text-4xl md:text-6xl font-bold text-white leading-tight mb-6" data-testid="heading-asset-store">
          THE INGREDIENT<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-blue-500">LIBRARY</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
          Production-ready assets for Veo 3.1 & Nano Banana. High-fidelity character sheets, textures, and sound profiles pre-optimized for AI ingestion.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory("ALL")}
            data-testid="filter-all"
            className={`px-6 py-2 rounded-full text-xs font-header font-bold border transition-all cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-white text-black border-white"
                : "border-white/20 hover:bg-white/10"
            }`}
          >
            ALL
          </button>
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-testid={`filter-${cat.toLowerCase().replace(/[\s/]+/g, '-')}`}
              className={`px-6 py-2 rounded-full text-xs font-header font-bold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-black border-white"
                  : "border-white/20 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <section className="py-12 bg-black/50 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-20 text-gray-500 font-mono text-sm">Loading assets...</div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-mono text-sm">No assets available in this category.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAssets.map((asset: any) => (
                <Link
                  key={asset.id}
                  href={`/store/${asset.slug}`}
                  data-testid={`card-store-asset-${asset.id}`}
                  className={`glass-panel p-0 group cursor-pointer ${getHoverBorderClass(asset.color)} transition-all duration-300 overflow-hidden block`}
                >
                  <div className="aspect-[16/9] bg-gray-800 relative overflow-hidden">
                    {asset.imageUrl ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        style={{ backgroundImage: `url('${asset.imageUrl}')` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        <div className="font-mono text-xs text-green-500 opacity-70 p-8 leading-relaxed">
                          &gt; {asset.fileFormat}<br />
                          &gt; {asset.fileSize || "Digital Download"}<br />
                          &gt; {asset.category}
                        </div>
                      </div>
                    )}
                    {asset.badge && (
                      <div className={`absolute top-4 left-4 ${getBadgeBgClass(asset.color)} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider`}>
                        {asset.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`font-header text-lg text-white ${getHoverTextClass(asset.color)} transition-colors`} data-testid={`text-asset-title-${asset.id}`}>
                        {asset.title}
                      </h3>
                      <div className="text-right flex-shrink-0 ml-4">
                        {asset.originalPrice && parseFloat(asset.originalPrice) > parseFloat(asset.price) && (
                          <span className="font-mono text-sm text-gray-500 line-through mr-2">${parseFloat(asset.originalPrice).toFixed(0)}</span>
                        )}
                        <span className="font-mono text-white">${parseFloat(asset.price).toFixed(0)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 font-mono mb-4 border-b border-white/10 pb-4">
                      {asset.shortDescription || asset.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 font-header">{asset.fileFormat}</span>
                      <span className={`text-xs font-bold text-white ${getButtonHoverClass(asset.color)} transition-colors flex items-center gap-1`} data-testid={`btn-view-asset-${asset.id}`}>
                        VIEW DETAILS →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
