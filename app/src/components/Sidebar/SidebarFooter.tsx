import { Settings, User } from 'lucide-react';

export function SidebarFooter() {
  return (
    <div className="px-6 py-5 border-t border-sidebar-border bg-gradient-to-t from-white/40 to-transparent">
      <div className="flex items-center justify-center gap-3">
        <button className="p-2.5 rounded-lg text-text-secondary hover:bg-white hover:text-text-primary hover:shadow-sm transition-all duration-250 active:scale-95">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2.5 rounded-lg text-text-secondary hover:bg-white hover:text-text-primary hover:shadow-sm transition-all duration-250 active:scale-95">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
