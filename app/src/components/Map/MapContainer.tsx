import { useState, useMemo, useEffect } from 'react';
import { MapContainer as LMapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Location } from '@/types';
import { categories } from '@/data/locations';
import geoJsonData from '@/data/morelos-geo.json';
import { SearchBar } from './SearchBar';
import { LocationMarker } from './LocationMarker';
import { Maximize2 } from 'lucide-react';

interface MapContainerProps {
  locations: Location[];
  selectedCategory: string | null;
  selectedLocation: Location | null;
  onSelectLocation: (location: Location | null) => void;
}

// Component to handle map interactions like zoom and fitting bounds
function MapController({
  bounds,
  selectedLocation,
  setZoomInstance
}: {
  bounds: L.LatLngBoundsExpression,
  selectedLocation: Location | null,
  setZoomInstance: (map: L.Map) => void
}) {
  const map = useMap();

  useEffect(() => {
    setZoomInstance(map);
    map.fitBounds(bounds, { padding: [2, 2], maxZoom: 18 });

    // Set max bounds to restrict navigation
    const maxBounds = L.latLngBounds(bounds as L.LatLngTuple[]);
    map.setMaxBounds(maxBounds.pad(0.1)); // Allow slight overflow
    map.setMinZoom(9);
  }, [map, bounds, setZoomInstance]);

  // Effect to fly to selected location
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.latitud, selectedLocation.longitud], 14, {
        animate: true,
        duration: 1.5
      });
    }
  }, [map, selectedLocation]);

  return null;
}

// Fixed bounds roughly covering Morelos state
const MORELOS_BOUNDS: L.LatLngBoundsExpression = [
  [18.25, -99.55],
  [19.10, -98.65]
];

export function MapContainer({ locations, selectedCategory, selectedLocation, onSelectLocation }: MapContainerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  const filteredLocations = useMemo(() => {
    let result = locations;

    if (selectedCategory) {
      result = result.filter((loc: Location) => loc.categoryId === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((loc: Location) =>
        loc.entidad.toLowerCase().includes(query) ||
        loc.direccion.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery, locations]);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#2E3B2B';
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || 'Building2';
  };

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-sm bg-[#E8E4D9]">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
      />

      {/* Map Area */}
      <div className="w-full h-full relative z-0">
        <LMapContainer
          center={[18.72, -99.08]} // Approximate center of Morelos
          zoom={10}
          zoomSnap={0.25}
          zoomDelta={0.25}
          zoomControl={false}
          className="w-full h-full"
          style={{ background: '#E8E4D9' }}
        >
          {/* Base Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Morelos Polygon */}
          <GeoJSON
            data={geoJsonData as any}
            style={{
              color: '#2E3B2B',
              weight: 2,
              opacity: 1,
              fillColor: '#4A5D44',
              fillOpacity: 0.2
            }}
          />

          {/* Markers */}
          {filteredLocations.map((location: Location) => {
            const isHovered = hoveredLocation === location.id;
            const isSelected = selectedLocation?.id === location.id;

            return (
              <LocationMarker
                key={location.id}
                location={location}
                color={getCategoryColor(location.categoryId)}
                iconType={getCategoryIcon(location.categoryId)}
                isHovered={isHovered}
                isSelected={isSelected}
                onHover={setHoveredLocation}
                onClick={onSelectLocation}
              />
            );
          })}

          <MapController
            bounds={MORELOS_BOUNDS}
            selectedLocation={selectedLocation}
            setZoomInstance={setMapInstance}
          />
        </LMapContainer>

        {/* Custom Zoom Controls */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-[1000]">
          <button
            onClick={() => mapInstance?.zoomIn()}
            className="w-11 h-11 bg-white rounded-xl shadow-card flex items-center justify-center text-text-primary hover:bg-gray-50 hover:shadow-hover transition-all duration-250 text-lg font-semibold active:scale-95 border border-gray-100"
          >
            +
          </button>
          <button
            onClick={() => mapInstance?.zoomOut()}
            className="w-11 h-11 bg-white rounded-xl shadow-card flex items-center justify-center text-text-primary hover:bg-gray-50 hover:shadow-hover transition-all duration-250 text-lg font-semibold active:scale-95 border border-gray-100"
          >
            −
          </button>
          <div className="h-0.5 bg-gray-100 mx-2 my-1 hidden lg:block" />
          <button
            onClick={() => mapInstance?.fitBounds(MORELOS_BOUNDS, { padding: [10, 10] })}
            className="w-11 h-11 bg-white rounded-xl shadow-card flex items-center justify-center text-text-primary hover:bg-gray-50 hover:shadow-hover transition-all duration-250 active:scale-95 border border-gray-100"
            title="Restablecer vista"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
