import type { Location } from '@/types';
import {
  ChevronLeft,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';

interface LocationDetailProps {
  location: Location;
  categoryColor: string;
  onClose: () => void;
}

export function LocationDetail({ location, categoryColor, onClose }: LocationDetailProps) {
  return (
    <div className="flex flex-col h-full bg-sidebar animate-slide-in-left shadow-xl">
      {/* Header with Back Button and Image */}
      <div className="relative shrink-0">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 z-10 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center text-[#2E3B2B] hover:bg-white hover:shadow-md transition-all duration-250 active:scale-95 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Location Image */}
        <div className="h-52 w-full bg-gray-200 overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800"
            alt={location.entidad}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-7 space-y-7">
        {/* Header Info */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2
              className="text-lg text-[#2E3B2B] break-words"
              style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 400, lineHeight: '1.2' }}
            >
              {location.entidad}
            </h2>
          </div>
          <span
            className="text-[9px] font-bold px-2 py-1 rounded-md text-white shrink-0 uppercase tracking-wider shadow-sm max-w-[120px] text-center"
            style={{ backgroundColor: categoryColor }}
          >
            {location.organo}
          </span>
        </div>

        {/* Details List */}
        <div className="space-y-6">
          {/* Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-[#4A5D44]">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span
                className="text-sm text-[#4A5D44]"
                style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 700, lineHeight: '1.2' }}
              >
                Ubicación
              </span>
            </div>
            <p
              className="text-[13px] text-[#2E3B2B] pl-10"
              style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 300, lineHeight: '1.4', letterSpacing: '0.01em' }}
            >
              {location.direccion}
            </p>
          </div>

          {/* Schedule */}
          {location.horario && (
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-[#4A5D44]">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span
                  className="text-sm text-[#4A5D44]"
                  style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 700, lineHeight: '1.2' }}
                >
                  Horario
                </span>
              </div>
              <p
                className="text-[13px] text-[#2E3B2B] pl-10"
                style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 300, lineHeight: '1.4', letterSpacing: '0.01em' }}
              >
                {location.horario}
              </p>
            </div>
          )}

          {/* Phone */}
          {location.telefono && (
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-[#4A5D44]">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span
                  className="text-sm text-[#4A5D44]"
                  style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 700, lineHeight: '1.2' }}
                >
                  Teléfono
                </span>
              </div>
              <p
                className="text-[13px] text-[#2E3B2B] underline decoration-[#2E3B2B]/30 underline-offset-2 pl-10"
                style={{ fontFamily: '"Twogether Sans", Inter, sans-serif', fontWeight: 300, lineHeight: '1.4', letterSpacing: '0.01em' }}
              >
                {location.telefono}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            className="w-full py-3.5 px-6 text-white text-[13px] font-semibold rounded-xl hover:opacity-90 hover:shadow-lg transition-all duration-250 shadow-md active:scale-[0.98]"
            style={{ backgroundColor: '#7A3E65' }}
          >
            Contactar institución
          </button>
        </div>
      </div>
    </div>
  );
}
