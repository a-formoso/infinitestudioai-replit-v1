import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPageContent, updateSiteContent, getCurrentUser } from "@/lib/api";
import { Pencil, Check, X } from "lucide-react";

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
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

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
      setIsEditing(false);
    },
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const startEditing = () => {
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

  if (!isAdmin) {
    return (
      <Tag className={className} data-testid={testId}>
        {renderContent ? renderContent(currentValue) : currentValue}
      </Tag>
    );
  }

  if (isEditing) {
    return (
      <div className="relative inline-flex items-start gap-2 w-full" data-testid={testId ? `${testId}-editing` : undefined}>
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} bg-white/10 border border-electricBlue/50 rounded px-2 py-1 outline-none focus:border-electricBlue w-full resize-y min-h-[60px]`}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} bg-white/10 border border-electricBlue/50 rounded px-2 py-1 outline-none focus:border-electricBlue w-full`}
          />
        )}
        <div className="flex gap-1 shrink-0 mt-1">
          <button
            onClick={save}
            disabled={mutation.isPending}
            className="p-1 bg-green-600 hover:bg-green-500 rounded text-white transition-colors"
            data-testid={testId ? `${testId}-save` : "editable-save"}
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={cancel}
            className="p-1 bg-red-600 hover:bg-red-500 rounded text-white transition-colors"
            data-testid={testId ? `${testId}-cancel` : "editable-cancel"}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group/edit relative inline-block cursor-pointer"
      onClick={startEditing}
      data-testid={testId}
    >
      <Tag className={className}>
        {renderContent ? renderContent(currentValue) : currentValue}
      </Tag>
      <div className="absolute -top-2 -right-6 opacity-0 group-hover/edit:opacity-100 transition-opacity">
        <div className="p-1 bg-electricBlue rounded-full shadow-lg shadow-electricBlue/30">
          <Pencil className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className="absolute inset-0 border border-transparent group-hover/edit:border-electricBlue/30 rounded transition-colors pointer-events-none" />
    </div>
  );
}
