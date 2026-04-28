"use client";

import * as React from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonProps {
  filename: string;
  getData: () => Promise<Record<string, unknown>[]>;
  formats?: "csv"[];
  disabled?: boolean;
}

export function ExportButton({
  filename,
  getData,
  formats = ["csv"],
  disabled = false,
}: ExportButtonProps) {
  const [exporting, setExporting] = React.useState<string | null>(null);

  async function handleExport(format: "csv") {
    setExporting(format);
    try {
      const data = await getData();

      if (data.length === 0) {
        toast.warning("Sem dados para exportar");
        return;
      }

      const headers = Object.keys(data[0]);
      const rows = data.map((row) => headers.map((header) => formatCsvCell(row[header])));
      const csv = [headers.map(formatCsvCell), ...rows].map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      downloadBlob(blob, `${filename}.csv`);

      toast.success(`Exportado como ${format.toUpperCase()}!`);
    } catch {
      toast.error("Erro ao exportar dados");
    } finally {
      setExporting(null);
    }
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function formatCsvCell(value: unknown) {
    const text = value == null ? "" : String(value);
    const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text;

    return `"${safeText.replaceAll('"', '""')}"`;
  }

  if (formats.length === 1) {
    const format = formats[0];
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || !!exporting}
        onClick={() => handleExport(format)}
        className="gap-2"
      >
        {exporting ? <Loader2 className="animate-spin" /> : <Download />}
        Exportar {format.toUpperCase()}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || !!exporting}
          className="gap-2"
        >
          {exporting ? <Loader2 className="animate-spin" /> : <Download />}
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {formats.map((format) => (
          <DropdownMenuItem key={format} onClick={() => handleExport(format)}>
            Exportar {format.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
