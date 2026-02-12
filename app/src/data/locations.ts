import type { Category, Location } from '@/types';

export const categories: Category[] = [
  { id: 'comision-victimas', name: 'Comisión Ejecutiva de Atención a Víctimas', icon: 'UserCheck', count: 0, color: '#7A856D' },
  { id: 'consejeria-juridica', name: 'Consejería Jurídica', icon: 'Gavel', count: 0, color: '#7A3E65' },
  { id: 'fiscalia-anticorrupcion', name: 'Fiscalía Anticorrupción', icon: 'ShieldCheck', count: 0, color: '#7A3E65' },
  { id: 'fondo-editorial', name: 'Fondo Editorial del Estado de Morelos', icon: 'BookOpen', count: 0, color: '#8C7752' },
  { id: 'jefatura-oficina', name: 'Jefatura de la Oficina de la Gubernatura', icon: 'Briefcase', count: 0, color: '#8C7752' },
  { id: 'secretaria-finanzas', name: 'Secretaría de Administración y Finanzas', icon: 'Banknote', count: 0, color: '#8C7752' },
  { id: 'secretaria-agropecuario', name: 'Secretaría de Desarrollo Agropecuario', icon: 'Sprout', count: 0, color: '#4A5D44' },
  { id: 'secretaria-bienestar', name: 'Secretaría de Bienestar', icon: 'Heart', count: 0, color: '#A95C44' },
  { id: 'secretaria-contraloria', name: 'Secretaría de la Contraloría', icon: 'ClipboardCheck', count: 0, color: '#7A856D' },
  { id: 'secretaria-cultura', name: 'Secretaría de Cultura', icon: 'Palette', count: 0, color: '#7A3E65' },
  { id: 'secretaria-desarrollo-economico', name: 'Secretaría de Desarrollo Económico y del Trabajo', icon: 'BarChart3', count: 0, color: '#4A5D44' },
  { id: 'secretaria-educacion', name: 'Secretaría de Educación', icon: 'GraduationCap', count: 0, color: '#7A856D' },
  { id: 'secretaria-gobierno', name: 'Secretaría de Gobierno', icon: 'Landmark', count: 0, color: '#8C7752' },
  { id: 'secretaria-infraestructura', name: 'Secretaría de Infraestructura', icon: 'Construction', count: 0, color: '#4A5D44' },
  { id: 'secretaria-mujeres', name: 'Secretaría de las Mujeres', icon: 'Users', count: 0, color: '#A95C44' },
  { id: 'secretaria-salud', name: 'Secretaría de Salud', icon: 'Stethoscope', count: 0, color: '#A95C44' },
  { id: 'secretaria-seguridad', name: 'Secretaría de Seguridad y Protección Ciudadana', icon: 'Shield', count: 0, color: '#2E3B2B' },
  { id: 'secretaria-desarrollo-sustentable', name: 'Secretaría de Desarrollo Sustentable', icon: 'Leaf', count: 0, color: '#4A5D44' },
  { id: 'secretaria-turismo', name: 'Secretaría de Turismo', icon: 'Palmtree', count: 0, color: '#8C7752' },
  { id: 'sindicato-trabajadores', name: 'Sindicato de Trabajadores al Servicio del Poder Ejecutivo del Estado de Morelos', icon: 'Users2', count: 0, color: '#7A856D' },
];

export const locations: Location[] = [
  {
    id: '1',
    latitud: 18.85,
    longitud: -99.2,
    organo: 'Secretaría de Salud',
    entidad: 'Hospital del Niño',
    google_maps: 'https://maps.google.com',
    direccion: 'Av. de Salud 1, Benito Juárez, 62765 Emiliano Zapata, Mor.',
    horario: 'Abierto 24 hrs',
    telefono: '777 362 1170',
    correo: 'contacto@salud.gob.mx',
    categoryId: 'secretaria-salud',
    coordinates: { lat: 18.85, lng: -99.2 },
  },
  {
    id: '4',
    latitud: 18.98,
    longitud: -99.24,
    organo: 'Secretaría de Educación',
    entidad: 'Universidad Autónoma del Estado de Morelos',
    google_maps: 'https://maps.google.com',
    direccion: 'Av. Universidad 1001, Chamilpa, 62209 Cuernavaca, Mor.',
    horario: 'Lunes a Viernes 7:00 - 21:00',
    telefono: '777 329 7900',
    correo: 'rectoria@uaem.mx',
    categoryId: 'secretaria-educacion',
    coordinates: { lat: 18.98, lng: -99.24 },
  },
];

export const getLocationsByCategory = (categoryId: string): Location[] => {
  return locations.filter(loc => loc.categoryId === categoryId);
};

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(loc => loc.id === id);
};

export const searchLocations = (query: string): Location[] => {
  const lowerQuery = query.toLowerCase();
  return locations.filter(loc =>
    loc.entidad.toLowerCase().includes(lowerQuery) ||
    loc.direccion.toLowerCase().includes(lowerQuery)
  );
};
