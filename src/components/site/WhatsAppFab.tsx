import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/brand";

export function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con TRANSMUDAR por WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-mint-deep px-4 py-3.5 font-semibold text-white shadow-lift transition-transform hover:scale-[1.03] focus-visible:scale-[1.03] sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
