import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "@/lib/api";
import { useEditMode } from "@/components/editable-text";
import { Pencil, Check, X } from "lucide-react";

interface EditableCourseFieldProps {
  courseId: string;
  field: string;
  value: string;
  isAdmin: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  multiline?: boolean;
  "data-testid"?: string;
}

export function EditableCourseField({
  courseId,
  field,
  value,
  isAdmin,
  as: Tag = "span",
  className = "",
  multiline = false,
  "data-testid": testId,
}: EditableCourseFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const { editMode } = useEditMode();

  const mutation = useMutation({
    mutationFn: ({ val }: { val: string }) =>
      updateCourse(courseId, { [field]: val }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
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
    setEditValue(value);
    setIsEditing(true);
  };

  const save = () => {
    let val = editValue.trim();
    if (!val || val === value) {
      setIsEditing(false);
      return;
    }
    if (field === "price") {
      val = val.replace(/[$,\s]/g, "");
      if (isNaN(Number(val))) {
        setIsEditing(false);
        return;
      }
    }
    mutation.mutate({ val });
  };

  const cancel = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsEditing(false);
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
        {value}
      </Tag>
    );
  }

  if (isEditing) {
    return (
      <div
        className="relative"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        data-testid={testId ? `${testId}-editing` : undefined}
      >
        <div className="flex items-start gap-1">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-black/90 border-2 border-electricBlue text-white text-xs px-2 py-1 outline-none rounded font-body resize-y min-h-[50px]"
              rows={2}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-black/90 border-2 border-electricBlue text-white text-xs px-2 py-1 outline-none rounded font-body"
            />
          )}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); save(); }}
            disabled={mutation.isPending}
            className="p-1 bg-green-600 hover:bg-green-500 rounded text-white shrink-0"
            data-testid={testId ? `${testId}-save` : undefined}
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={cancel}
            className="p-1 bg-white/10 hover:bg-white/20 rounded text-white shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group/cedit relative cursor-pointer"
      onClick={startEditing}
      data-testid={testId}
    >
      <div className="absolute inset-0 border border-dashed border-electricBlue/30 rounded pointer-events-none -m-0.5 group-hover/cedit:border-electricBlue/70 transition-colors" />
      <Tag className={className}>{value}</Tag>
      <div className="absolute -top-1 -right-1 opacity-0 group-hover/cedit:opacity-100 transition-all z-10">
        <div className="p-0.5 bg-electricBlue rounded-full shadow-lg">
          <Pencil className="w-2.5 h-2.5 text-white" />
        </div>
      </div>
      {showSaved && (
        <div className="absolute -top-1 -right-1 z-10">
          <div className="px-1.5 py-0.5 bg-green-600 rounded-full text-white text-[8px] font-bold">
            <Check className="w-2.5 h-2.5 inline" /> SAVED
          </div>
        </div>
      )}
    </div>
  );
}
