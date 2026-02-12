import type { Category, Location } from '@/types';
import {
  Building2,
  GraduationCap,
  Plane,
  FileText,
  ChevronRight,
  ChevronDown,
  UserCheck,
  Gavel,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Banknote,
  Sprout,
  Heart,
  ClipboardCheck,
  Palette,
  BarChart3,
  Landmark,
  Construction,
  Users,
  Stethoscope,
  Shield,
  Leaf,
  Palmtree,
  Users2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryItemProps {
  category: Category;
  locations?: Location[];
  isSelected: boolean;
  isExpanded: boolean;
  onClick: () => void;
  onSelectLocation: (location: Location) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Building2,
  GraduationCap,
  Plane,
  FileText,
  UserCheck,
  Gavel,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Banknote,
  Sprout,
  Heart,
  ClipboardCheck,
  Palette,
  BarChart3,
  Landmark,
  Construction,
  Users,
  Stethoscope,
  Shield,
  Leaf,
  Palmtree,
  Users2
};

export function CategoryItem({ category, locations = [], isSelected, isExpanded, onClick, onSelectLocation }: CategoryItemProps) {
  const IconComponent = iconMap[category.icon] || Building2;
  const hasSubcategories = locations.length > 0;

  return (
    <div className="space-y-1">
      <button
        onClick={onClick}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-250 group relative",
          isSelected
            ? "bg-white shadow-md text-[#2E3B2B]"
            : "text-[#2E3B2B] hover:bg-white/40"
        )}
      >
        {/* Borde verde a la izquierda cuando está seleccionado */}
        {isSelected && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#6B8E23] rounded-r-full" />
        )}

        <div className="flex items-center gap-3 min-w-0 flex-1 py-1">
          <IconComponent className="w-5 h-5 text-[#3D3D3D] shrink-0 mt-0.5" />
          <span className="text-left" style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 400, lineHeight: '1.2' }}>
            {category.name}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Badge de conteo */}
          <span className="text-xs px-2.5 py-1 rounded-md bg-[#6B705C] text-white font-semibold min-w-[32px] text-center">
            {category.count}
          </span>
          <div className="w-5 flex justify-center">
            {hasSubcategories ? (
              isExpanded ? (
                <ChevronDown className="w-5 h-5 text-[#3D3D3D]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#3D3D3D]" />
              )
            ) : null}
          </div>
        </div>
      </button>

      {/* Subcategorías (Entidades) */}
      {hasSubcategories && isExpanded && (
        <div className="relative ml-6 pl-4 border-l-2 border-[#D4D9C5] space-y-1 animate-slide-down overflow-hidden pb-1">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectLocation(loc);
              }}
              className={cn(
                "w-full text-left px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 active:bg-[#D4D9C5]",
                "text-[#2E3B2B] hover:bg-[#D4D9C5]/50"
              )}
              style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 400, lineHeight: '1.2' }}
            >
              {loc.entidad}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
