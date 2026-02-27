import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getAsset } from "@/lib/api";
import { ArrowLeft, FileText, Code, File, FileCode, Package, ShoppingCart } from "lucide-react";

const featureIcons: Record<string, any> = {
  pdf: FileText,
  json: Code,
  md: FileCode,
  template: File,
  default: Package,
};

function getIconForText(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("pdf")) return FileText;
  if (lower.includes("json") || lower.includes("schema")) return Code;
  if (lower.includes("markdown") || lower.includes(".md")) return FileCode;
  if (lower.includes("template")) return File;
  return Package;
}

export default function AssetDetail() {
  const [, params] = useRoute("/store/:slug");
  const slug = params?.slug || "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["asset", slug],
    queryFn: () => getAsset(slug),
    enabled: !!slug,
  });

  const asset = data?.data?.asset;

  const getAccentVar = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "#8b5cf6",
      electricBlue: "#2962FF",
      signalOrange: "#FF3D00",
      white: "#e5e7eb",
    };
    return map[color] || "#8b5cf6";
  };

  const getAccentClass = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "text-neonPurple",
      electricBlue: "text-electricBlue",
      signalOrange: "text-signalOrange",
      white: "text-gray-300",
    };
    return map[color] || "text-neonPurple";
  };

  const getBgClass = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "bg-neonPurple",
      electricBlue: "bg-electricBlue",
      signalOrange: "bg-signalOrange",
      white: "bg-white text-black",
    };
    return map[color] || "bg-neonPurple";
  };

  const getBorderClass = (color: string) => {
    const map: Record<string, string> = {
      neonPurple: "border-neonPurple/30",
      electricBlue: "border-electricBlue/30",
      signalOrange: "border-signalOrange/30",
      white: "border-white/20",
    };
    return map[color] || "border-neonPurple/30";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased flex flex-col">
        <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-gray-500 font-mono text-sm">Loading asset...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !asset) {
    return (
      <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased flex flex-col">
        <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-header text-2xl text-white mb-4">ASSET NOT FOUND</h1>
            <p className="text-gray-500 font-mono text-sm mb-6">This product doesn't exist or has been removed.</p>
            <Link href="/store" className="text-neonPurple hover:text-white font-header text-sm transition-colors">
              ← BACK TO STORE
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const accent = getAccentVar(asset.color);
  const accentText = getAccentClass(asset.color);
  const accentBg = getBgClass(asset.color);
  const accentBorder = getBorderClass(asset.color);

  const descriptionSections = parseDescription(asset.description || "");

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-neonPurple selection:text-white overflow-x-hidden flex flex-col">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      <main className="flex-grow relative z-10">
        <div className="pt-32 pb-6 px-6 max-w-7xl mx-auto">
          <Link href="/store" className="inline-flex items-center gap-2 text-gray-500 hover:text-white font-mono text-xs transition-colors mb-8 group" data-testid="link-back-to-store">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            BACK TO STORE
          </Link>
        </div>

        <div className="px-6 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <div className={`aspect-[4/3] bg-gray-900 relative overflow-hidden border ${accentBorder}`}>
                {asset.imageUrl ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${asset.imageUrl}')` }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="font-mono text-xs text-green-500 opacity-70 p-8 leading-relaxed text-center">
                      &gt; FORMAT: {asset.fileFormat}<br />
                      &gt; SIZE: {asset.fileSize || "Digital Download"}<br />
                      &gt; CATEGORY: {asset.category}
                    </div>
                  </div>
                )}
                {asset.badge && (
                  <div className={`absolute top-4 left-4 ${accentBg} text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider`}>
                    {asset.badge}
                  </div>
                )}
              </div>

              <div className="glass-panel border border-white/10 p-6 space-y-4">
                <h3 className="font-header text-sm text-white tracking-widest">PRODUCT DETAILS</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">Format</p>
                    <p className="text-sm text-white font-mono" data-testid="text-file-format">{asset.fileFormat}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">File Size</p>
                    <p className="text-sm text-white font-mono" data-testid="text-file-size">{asset.fileSize || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">Category</p>
                    <p className="text-sm text-white font-mono" data-testid="text-category">{asset.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">Slug</p>
                    <p className="text-sm text-gray-400 font-mono">{asset.slug}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className={`text-[10px] font-bold ${accentText} tracking-widest mb-3`}>{asset.category}</p>
                <h1 className="font-header text-3xl md:text-4xl font-bold text-white leading-tight mb-4" data-testid="text-asset-title">
                  {asset.title}
                </h1>
                {asset.shortDescription && (
                  <p className="text-lg text-gray-300 leading-relaxed font-light italic" data-testid="text-asset-subtitle">
                    {asset.shortDescription}
                  </p>
                )}
              </div>

              <div className="flex items-end gap-4">
                <div>
                  {asset.originalPrice && parseFloat(asset.originalPrice) > parseFloat(asset.price) && (
                    <span className="text-lg text-gray-500 line-through font-mono mr-3" data-testid="text-original-price">
                      ${parseFloat(asset.originalPrice).toFixed(0)}
                    </span>
                  )}
                  <span className="text-4xl font-header font-bold text-white" data-testid="text-price">
                    ${parseFloat(asset.price).toFixed(0)}
                  </span>
                </div>
              </div>

              <button
                className={`w-full ${accentBg} text-white py-4 text-sm font-header font-bold tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-3 cursor-pointer`}
                data-testid="btn-add-to-cart"
              >
                <ShoppingCart className="w-4 h-4" />
                ADD TO CART +
              </button>

              <div className="border-t border-white/10 pt-8 space-y-6">
                {descriptionSections.map((section, i) => {
                  if (section.type === "callout") {
                    return (
                      <div key={i} className={`border-l-2 ${accentBorder} bg-white/[0.03] p-5 rounded-r`}>
                        <p className="text-sm text-gray-300 leading-relaxed italic">
                          {section.content}
                        </p>
                      </div>
                    );
                  }
                  if (section.type === "heading") {
                    return (
                      <h3 key={i} className={`font-header text-sm ${accentText} tracking-widest uppercase mt-8`}>
                        {section.content}
                      </h3>
                    );
                  }
                  if (section.type === "feature") {
                    const Icon = getIconForText(section.content);
                    const parts = section.content.split(":**");
                    const title = parts[0]?.replace(/^\*\*/, "") || "";
                    const desc = parts[1] || section.content;
                    return (
                      <div key={i} className="flex gap-4 items-start group">
                        <div className={`w-8 h-8 flex-shrink-0 ${accentBg}/10 border ${accentBorder} flex items-center justify-center mt-0.5`}>
                          <Icon className={`w-4 h-4 ${accentText}`} />
                        </div>
                        <div>
                          {parts.length > 1 ? (
                            <>
                              <p className="text-sm text-white font-bold mb-1">{title.replace(/\*\*/g, "")}</p>
                              <p className="text-sm text-gray-400 leading-relaxed">{desc.trim()}</p>
                            </>
                          ) : (
                            <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <p key={i} className="text-sm text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface DescSection {
  type: "paragraph" | "heading" | "feature" | "callout";
  content: string;
}

function parseDescription(raw: string): DescSection[] {
  if (!raw) return [];
  const sections: DescSection[] = [];

  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    if (line.startsWith("> ") || line.startsWith('"') && line.endsWith('"')) {
      sections.push({ type: "callout", content: line.replace(/^>\s*/, "").replace(/^"|"$/g, "") });
    } else if (line.startsWith("## ") || line.startsWith("### ")) {
      sections.push({ type: "heading", content: line.replace(/^#+\s*/, "") });
    } else if (line.startsWith("* ") || line.startsWith("- ")) {
      sections.push({ type: "feature", content: line.replace(/^[*-]\s*/, "") });
    } else if (line.startsWith("[") && line.includes("]")) {
      sections.push({ type: "heading", content: line.replace(/^\[|\]$/g, "").replace(/\]/g, "") });
    } else {
      sections.push({ type: "paragraph", content: line });
    }
  }

  return sections;
}
