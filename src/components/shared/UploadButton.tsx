"use client";

import * as React from "react";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

interface UploadButtonProps {
  bucket: string;
  path: string;
  onUploadComplete: (url: string) => void;
  accept?: string;
  label?: string;
  disabled?: boolean;
}

export function UploadButton({
  bucket,
  path,
  onUploadComplete,
  accept = "image/*,application/pdf",
  label = "Upload ficheiro",
  disabled = false,
}: UploadButtonProps) {
  const [uploading, setUploading] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Tipo de ficheiro não permitido", {
        description: "Apenas PDF, JPG, PNG e WebP são aceites.",
      });
      return;
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("Ficheiro demasiado grande", {
        description: "Tamanho máximo: 5 MB.",
      });
      return;
    }

    setUploading(true);

    const filePath = `${path}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      toast.error("Erro ao fazer upload", { description: error.message });
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    onUploadComplete(publicUrl);
    setUploaded(true);
    setUploading(false);
    toast.success("Ficheiro enviado com sucesso!");
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        disabled={disabled || uploading}
        onClick={() => inputRef.current?.click()}
        className="gap-2"
      >
        {uploading ? (
          <Loader2 className="animate-spin" />
        ) : uploaded ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <Upload />
        )}
        {uploading ? "A enviar..." : uploaded ? "Enviado" : label}
      </Button>
    </>
  );
}
