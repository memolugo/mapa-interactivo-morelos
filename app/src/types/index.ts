// Categoría de servicios
export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories?: Subcategory[];
  color: string;
}

// Subcategoría
export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

// Ubicación/Servicio (bd_normalizada)
export interface Location {
  id: string; // Generado internamente o correlacionado
  latitud: number;
  longitud: number;
  organo: string; // Categoría/Órgano superior
  entidad: string; // Nombre del lugar
  google_maps?: string; // Link a Maps
  direccion: string;
  horario?: string;
  telefono?: string;
  correo?: string;
  categoryId: string; // Para compatibilidad con el sistema de filtrado actual
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Estado de la aplicación
export interface AppState {
  selectedCategory: string | null;
  selectedLocation: Location | null;
  searchQuery: string;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
}

// Tipo para iconos
export type IconType = 'Building2' | 'GraduationCap' | 'Plane' | 'FileText';
