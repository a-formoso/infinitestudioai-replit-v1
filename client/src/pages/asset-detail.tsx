import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useRoute, Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAsset, getCurrentUser, updateAsset as apiUpdateAsset, deleteAsset as apiDeleteAsset } from "@/lib/api";
import { useUpload } from "@/hooks/use-upload";
import { ArrowLeft, FileText, Code, File, FileCode, Package, ShoppingCart, Pencil, X, Upload, Trash2 } from "lucide-react";

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
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["asset", slug],
    queryFn: () => getAsset(slug),
    enabled: !!slug,
  });

  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const isAdmin = userData?.data?.user?.isAdmin === true;
  const asset = data?.data?.asset;
  const isDraft = asset?.status === "draft" || asset?.status === "archived";

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [detailSlugManuallyEdited, setDetailSlugManuallyEdited] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: "0",
    originalPrice: "",
    category: "",
    badge: "",
    imageUrl: "",
    fileFormat: "",
    fileSize: "",
    color: "neonPurple",
    status: "draft",
  });

  const updateAssetMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, any> }) => apiUpdateAsset(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["asset", slug] });
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      queryClient.invalidateQueries({ queryKey: ["adminAssets"] });
      const newSlug = result?.data?.asset?.slug;
      if (newSlug && newSlug !== slug) {
        setLocation(`/store/${newSlug}`, { replace: true });
      }
      setIsEditModalOpen(false);
    },
  });

  const deleteAssetMutation = useMutation({
    mutationFn: (id: string) => apiDeleteAsset(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      queryClient.invalidateQueries({ queryKey: ["adminAssets"] });
      setLocation("/store");
    },
  });

  const { uploadFile: uploadAssetImage, isUploading: isImageUploading } = useUpload({
    onSuccess: (response) => {
      setEditForm(prev => ({ ...prev, imageUrl: response.objectPath }));
    },
  });

  const handleOpenEdit = () => {
    if (!asset) return;
    setDetailSlugManuallyEdited(true);
    setEditForm({
      title: asset.title || "",
      slug: asset.slug || "",
      description: asset.description || "",
      shortDescription: asset.shortDescription || "",
      price: asset.price || "0",
      originalPrice: asset.originalPrice || "",
      category: asset.category || "",
      badge: asset.badge || "",
      imageUrl: asset.imageUrl || "",
      fileFormat: asset.fileFormat || "",
      fileSize: asset.fileSize || "",
      color: asset.color || "neonPurple",
      status: asset.status || "draft",
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!asset || !editForm.title || !editForm.category || !editForm.fileFormat) return;
    const slugVal = editForm.slug || editForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload = {
      ...editForm,
      slug: slugVal,
      originalPrice: editForm.originalPrice || null,
      badge: editForm.badge || null,
    };
    await updateAssetMutation.mutateAsync({ id: asset.id, data: payload });
  };

  const handleDelete = async () => {
    if (!asset) return;
    await deleteAssetMutation.mutateAsync(asset.id);
  };

  const colorOptions = [
    { value: "neonPurple", label: "Neon Purple" },
    { value: "electricBlue", label: "Electric Blue" },
    { value: "signalOrange", label: "Signal Orange" },
    { value: "white", label: "White" },
  ];

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

  const accentText = getAccentClass(asset.color);
  const accentBg = getBgClass(asset.color);
  const accentBorder = getBorderClass(asset.color);
  const descriptionSections = parseDescription(asset.description || "");

  return (
    <div className="min-h-screen bg-obsidian text-offWhite font-body antialiased selection:bg-neonPurple selection:text-white overflow-x-hidden flex flex-col">
      <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>

      <Navbar />

      {isDraft && (
        <div className="bg-neonPurple/20 border-b border-neonPurple/40 px-6 py-3 text-center relative z-20 flex items-center justify-center gap-4">
          <span className="text-[10px] font-mono text-neonPurple tracking-widest">ADMIN PREVIEW — THIS ASSET IS NOT YET PUBLISHED</span>
          {isAdmin && (
            <button
              onClick={handleOpenEdit}
              className="text-[10px] font-mono text-white bg-neonPurple/40 hover:bg-neonPurple/60 px-3 py-1 transition-colors flex items-center gap-1.5 cursor-pointer"
              data-testid="btn-admin-edit-draft"
            >
              <Pencil className="w-3 h-3" /> EDIT ASSET
            </button>
          )}
        </div>
      )}

      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-50 flex gap-2">
          <button
            onClick={handleOpenEdit}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-mono px-4 py-3 hover:bg-white/20 transition-colors cursor-pointer"
            data-testid="btn-admin-edit"
          >
            <Pencil className="w-3.5 h-3.5" /> EDIT ASSET
          </button>
        </div>
      )}

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

      {isEditModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel p-5 sm:p-8 max-w-lg w-full border border-white/10 relative rounded-none max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer"
              data-testid="btn-close-edit-modal"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="font-header text-xl text-white mb-6">EDIT ASSET</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setEditForm(prev => ({ ...prev, title: newTitle, slug: autoSlug }));
                  }}
                  className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none uppercase font-bold"
                  data-testid="input-edit-title"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Short Description</label>
                <input
                  type="text"
                  value={editForm.shortDescription}
                  onChange={(e) => setEditForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none"
                  data-testid="input-edit-short-description"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Full Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none resize-none font-mono"
                  data-testid="input-edit-description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Price</label>
                  <input
                    type="text"
                    value={editForm.price}
                    onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none font-mono"
                    data-testid="input-edit-price"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Original Price</label>
                  <input
                    type="text"
                    value={editForm.originalPrice}
                    onChange={(e) => setEditForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="Optional strikethrough"
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none font-mono"
                    data-testid="input-edit-original-price"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value.toUpperCase() }))}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none font-bold"
                    data-testid="input-edit-category"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none appearance-none"
                    data-testid="select-edit-status"
                  >
                    <option value="draft">DRAFT</option>
                    <option value="published">PUBLISHED</option>
                    <option value="archived">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">File Format</label>
                  <input
                    type="text"
                    value={editForm.fileFormat}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fileFormat: e.target.value }))}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none font-mono"
                    data-testid="input-edit-file-format"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">File Size</label>
                  <input
                    type="text"
                    value={editForm.fileSize}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fileSize: e.target.value }))}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none font-mono"
                    data-testid="input-edit-file-size"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Badge</label>
                  <input
                    type="text"
                    value={editForm.badge}
                    onChange={(e) => setEditForm(prev => ({ ...prev, badge: e.target.value.toUpperCase() }))}
                    placeholder="e.g. BESTSELLER"
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none font-bold"
                    data-testid="input-edit-badge"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Accent Color</label>
                  <select
                    value={editForm.color}
                    onChange={(e) => setEditForm(prev => ({ ...prev, color: e.target.value }))}
                    className="bg-black/50 border border-white/10 text-white text-xs px-4 py-3 w-full focus:border-neonPurple outline-none appearance-none"
                    data-testid="select-edit-color"
                  >
                    {colorOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-500 mb-2 uppercase">Cover Image</label>
                <div className="flex gap-2 items-stretch">
                  <input
                    type="text"
                    value={editForm.imageUrl}
                    onChange={(e) => setEditForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://..."
                    className="flex-grow bg-black/50 border border-white/10 text-white text-xs px-4 py-3 focus:border-neonPurple outline-none font-mono"
                    data-testid="input-edit-image-url"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      id="edit-asset-image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          uploadAssetImage(e.target.files[0]);
                          e.target.value = '';
                        }
                      }}
                    />
                    <label
                      htmlFor="edit-asset-image-upload"
                      className="h-full bg-white/5 border border-white/10 text-white hover:bg-white/10 px-4 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      {isImageUploading ? <span className="text-[10px] font-mono">...</span> : <Upload className="w-4 h-4" />}
                    </label>
                  </div>
                </div>
                {editForm.imageUrl && (
                  <div className="mt-2 h-32 w-full bg-gray-900 border border-white/5 rounded overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center opacity-60"
                      style={{ backgroundImage: `url('${editForm.imageUrl}')` }}
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="py-3 px-4 text-xs font-header font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors cursor-pointer flex items-center gap-1.5"
                  data-testid="btn-delete-asset"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3 text-xs font-header font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={updateAssetMutation.isPending}
                  className="flex-1 py-3 text-xs font-header font-bold text-white bg-neonPurple hover:bg-white hover:text-black transition-colors disabled:opacity-50 cursor-pointer"
                  data-testid="btn-save-edit"
                >
                  {updateAssetMutation.isPending ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isDeleteConfirmOpen && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0a0a0a] border border-white/10 p-6 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500 border border-red-500/20">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-header text-lg text-white mb-2">DELETE ASSET</h3>
              <p className="text-xs font-mono text-gray-400">
                Are you sure you want to delete <span className="text-white font-bold">"{asset.title}"</span>? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="flex-1 py-3 text-xs font-header font-bold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteAssetMutation.isPending}
                className="flex-1 py-3 text-xs font-header font-bold text-black bg-red-500 hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                data-testid="btn-confirm-delete"
              >
                {deleteAssetMutation.isPending ? "DELETING..." : "DELETE"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
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
    if (line.startsWith("> ") || (line.startsWith('"') && line.endsWith('"'))) {
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
