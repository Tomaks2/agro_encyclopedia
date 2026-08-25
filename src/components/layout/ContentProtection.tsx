"use client";

import { useEffect } from "react";

export function ContentProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+P, Ctrl+S, Ctrl+A
      if (
        e.ctrlKey &&
        (e.key === "c" ||
          e.key === "v" ||
          e.key === "x" ||
          e.key === "p" ||
          e.key === "s" ||
          e.key === "a" ||
          e.key === "C" ||
          e.key === "V" ||
          e.key === "X" ||
          e.key === "P" ||
          e.key === "S" ||
          e.key === "A")
      ) {
        e.preventDefault();
      }

      // Prevent PrintScreen key
      if (e.key === "PrintScreen") {
        e.preventDefault();
        navigator.clipboard.writeText(""); // Clear clipboard just in case
      }

      // Prevent developer tools (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "i" || e.key === "j")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
      }
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };
    
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      /* Optional: try to blur or hide content when printing */
      @media print {
        body {
          display: none !important;
        }
      }
    `}} />
  );
}
