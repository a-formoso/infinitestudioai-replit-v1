import { useState, useRef, useEffect, createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPageContent, updateSiteContent, getCurrentUser } from "@/lib/api";
import { Pencil, Check, X, Eye, EyeOff } from "lucide-react";

const EditModeContext = createContext<{
  editMode: boolean;
  setEditMode: (v: boolean) => void;
}>({ editMode: false, setEditMode: () => {} });

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
}

export function AdminEditToggle() {
  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const isAdmin = userData?.data?.user?.isAdmin === true;
  const { editMode, setEditMode } = useEditMode();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="admin-edit-toggle">
      <button
        onClick={() => setEditMode(!editMode)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl font-header text-xs font-bold transition-all duration-300 ${
          editMode
            ? "bg-electricBlue text-white shadow-electricBlue/40 ring-2 ring-electricBlue/50"
            : "bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20 hover:text-white"
        }`}
        data-testid="button-toggle-edit-mode"
      >
        {editMode ? (
          <>
            <Eye className="w-4 h-4" />
            EDIT MODE ON
          </>
        ) : (
          <>
            <EyeOff className="w-4 h-4" />
            EDIT MODE
          </>
        )}
      </button>
    </div>
  );
}

interface EditableTextProps {
  page: string;
  contentKey: string;
  defaultValue: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  multiline?: boolean;
  renderContent?: (value: string) => React.ReactNode;
  "data-testid"?: string;
}

export function EditableText({
  page,
  contentKey,
  defaultValue,
  as: Tag = "span",
  className = "",
  multiline = false,
  renderContent,
  "data-testid": testId,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const { editMode } = useEditMode();

  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const isAdmin = userData?.data?.user?.isAdmin === true;

  const { data: contentData } = useQuery({
    queryKey: ["siteContent", page],
    queryFn: () => getPageContent(page),
  });

  const content = contentData?.data?.content || {};
  const currentValue = content[contentKey] || defaultValue;

  const mutation = useMutation({
    mutationFn: ({ value }: { value: string }) =>
      updateSiteContent(page, contentKey, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent", page] });
      queryClient.invalidateQueries({ queryKey: ["allSiteContent"] });
      setIsEditing(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    },
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (!editMode) setIsEditing(false);
  }, [editMode]);

  const startEditing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditValue(currentValue);
    setIsEditing(true);
  };

  const save = () => {
    if (editValue.trim() && editValue !== currentValue) {
      mutation.mutate({ value: editValue.trim() });
    } else {
      setIsEditing(false);
    }
  };

  const cancel = () => {
    setIsEditing(false);
    setEditValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      save();
    }
    if (e.key === "Escape") {
      cancel();
    }
  };

  if (!isAdmin || !editMode) {
    return (
      <Tag className={className} data-testid={testId}>
        {renderContent ? renderContent(currentValue) : currentValue}
      </Tag>
    );
  }

  if (isEditing) {
    return (
      <div className="relative w-full" data-testid={testId ? `${testId}-editing` : undefined}>
        <div className="flex items-start gap-2">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-black/80 border-2 border-electricBlue text-white text-sm px-3 py-2 outline-none focus:border-electricBlue rounded font-body resize-y min-h-[80px]"
              rows={3}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-black/80 border-2 border-electricBlue text-white text-sm px-3 py-2 outline-none focus:border-electricBlue rounded font-body"
            />
          )}
          <div className="flex gap-1 shrink-0">
            <button
              onClick={save}
              disabled={mutation.isPending}
              className="p-2 bg-green-600 hover:bg-green-500 rounded text-white transition-colors"
              data-testid={testId ? `${testId}-save` : "editable-save"}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={cancel}
              className="p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors"
              data-testid={testId ? `${testId}-cancel` : "editable-cancel"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-[10px] text-electricBlue/60 font-mono mt-1">
          {multiline ? "Shift+Enter for new line • Escape to cancel" : "Enter to save • Escape to cancel"}
        </div>
      </div>
    );
  }

  return (
    <div
      className="group/edit relative cursor-pointer"
      onClick={startEditing}
      data-testid={testId}
    >
      <div className="absolute inset-0 border-2 border-dashed border-electricBlue/40 rounded pointer-events-none -m-1 group-hover/edit:border-electricBlue/80 transition-colors" />
      <Tag className={className}>
        {renderContent ? renderContent(currentValue) : currentValue}
      </Tag>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-70 group-hover/edit:opacity-100 transition-all z-10">
        <div className="flex items-center gap-1 px-2 py-1 bg-electricBlue rounded-full shadow-lg shadow-electricBlue/30 text-white">
          <Pencil className="w-3 h-3" />
          <span className="text-[9px] font-bold hidden group-hover/edit:inline">EDIT</span>
        </div>
      </div>
      {showSaved && (
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-600 rounded-full text-white text-[9px] font-bold animate-pulse">
            <Check className="w-3 h-3" />
            SAVED
          </div>
        </div>
      )}
    </div>
  );
}
