"use client";

import { useEffect, useState } from "react";

type DriveFile = {
  id: string;
  name: string;
  webViewLink?: string;
};

type Props = {
  folderId: string;
  loadingLabel?: string;
  emptyLabel?: string;
};

export function DriveList({
  folderId,
  loadingLabel = "Cargando archivos...",
  emptyLabel = "No hay archivos aún.",
}: Props) {
  const [files, setFiles] = useState<DriveFile[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_DRIVE_API_KEY;

    if (!apiKey || !folderId) {
      setError("Carpeta no configurada.");
      return;
    }

    const fetchFiles = async () => {
      setError(null);
      setFiles(null);

      const q = encodeURIComponent(
        `'${folderId}' in parents and mimeType = 'application/pdf' and trashed = false`
      );
      const fields = encodeURIComponent("files(id,name,webViewLink,createdTime)");
      const url = `https://www.googleapis.com/drive/v3/files?q=${q}&orderBy=createdTime desc&fields=${fields}&key=${apiKey}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFiles(data.files || []);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los archivos. Intenta más tarde.");
      }
    };

    fetchFiles();
  }, [folderId]);

  if (error) {
    return (
      <li className="flex items-center justify-between text-xs text-red-400">
        <span>{error}</span>
      </li>
    );
  }

  if (!files) {
    return (
      <li className="flex items-center justify-between text-xs text-slate-400">
        <span>{loadingLabel}</span>
      </li>
    );
  }

  if (files.length === 0) {
    return (
      <li className="flex items-center justify-between text-xs text-slate-400">
        <span>{emptyLabel}</span>
      </li>
    );
  }

  return (
    <>
      {files.map((file) => (
        <li
          key={file.id}
          className="flex items-center justify-between border-b border-slate-900 py-1 text-sm last:border-b-0"
        >
          <span className="pr-4 text-slate-100">
            {file.name.replace(/\.pdf$/i, "")}
          </span>
          <a
            href={
              file.webViewLink ??
              `https://drive.google.com/file/d/${file.id}/view?usp=sharing`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Ver PDF
          </a>
        </li>
      ))}
    </>
  );
}
