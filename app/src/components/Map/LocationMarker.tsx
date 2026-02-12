import { useMemo } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Location } from '@/types';
import {
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
} from 'lucide-react';

interface LocationMarkerProps {
  location: Location;
  color: string;
  iconType: string;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onClick: (location: Location) => void;
}

import type { LucideProps } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
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

export function LocationMarker({
  location,
  color,
  iconType,
  isHovered,
  isSelected,
  onHover,
  onClick
}: LocationMarkerProps) {
  const IconComponent = iconMap[iconType] || Building2;

  const customIcon = useMemo(() => {
    const markerColor = isSelected ? '#EAB308' : color; // Vibrant gold when selected
    const iconMarkup = renderToStaticMarkup(
      <div className="relative group" style={{ width: '40px', height: '48px' }}>
        <svg
          width="40"
          height="48"
          viewBox="0 0 40 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
        >
          <path
            d="M20 48C20 48 40 31.7 40 20C40 8.95 31.05 0 20 0C8.95 0 0 8.95 0 20C0 31.7 20 48 20 48Z"
            fill={markerColor}
          />
          <circle cx="20" cy="20" r="14" fill="white" />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            transform: 'translate(-50%, -50%)',
            color: markerColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconComponent size={isSelected ? 20 : 18} />
        </div>
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '28px',
              height: '28px',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              backgroundColor: markerColor,
              opacity: 0.4,
              animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
              zIndex: -1
            }}
          />
        )}
      </div>
    );

    return L.divIcon({
      html: iconMarkup,
      className: '', // Remove default leaflet class
      iconSize: [40, 48],
      iconAnchor: [20, 48], // Bottom tip of the pin
    });
  }, [color, isSelected, isHovered, IconComponent]);

  return (
    <Marker
      position={[location.coordinates.lat, location.coordinates.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          onClick(location);
        },
        mouseover: () => onHover(location.id),
        mouseout: () => onHover(null),
      }}
      zIndexOffset={isSelected ? 1000 : isHovered ? 500 : 0}
    >
      <Tooltip
        permanent={isHovered || isSelected}
        direction="top"
        offset={[0, -20]}
        opacity={1}
        className="custom-tooltip"
      >
        <div className="font-medium text-sm text-[#2E3B2B] px-1 py-0.5">
          {location.entidad}
        </div>
      </Tooltip>
    </Marker>
  );
}
