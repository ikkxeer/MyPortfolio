import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./ProjectModal.css";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  children,
}: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="project-modal-overlay" onClick={onClose}>
      <div
        className="project-modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "project-modal-title" : undefined}
      >
        <div className="project-modal-header">
          {title && (
            <h2 id="project-modal-title" className="project-modal-title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>
        <div className="project-modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
}